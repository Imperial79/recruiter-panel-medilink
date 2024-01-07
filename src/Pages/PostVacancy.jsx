import React, { useContext, useEffect, useState } from "react";
import MainContent from "../Components/MainContent";
import Sidebar from "../Components/Sidebar";
import { Context } from "../Components/ContextProvider";
import { dbObject, experienceList } from "../Helper/Constants";
import useRazorpay from "react-razorpay";
import FullScreenLoading from "../Components/FullScreenLoading";
import {
  KFilePicker,
  KGrid,
  KTextArea,
  KTextField,
} from "../Components/components";

function PostVacancy() {
  const { user, _id, showAlert } = useContext(Context);
  const [termList, setTermList] = useState([]);
  const [roleList, setRoleList] = useState([]);
  const [subRoleList, setSubRoleList] = useState(["Choose Sub Role"]);
  const [loading, setLoading] = useState(false);
  const [Razorpay, isLoaded] = useRazorpay();
  const [amount, setAmount] = useState(0);
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  const [expireDate, setExpireDate] = useState(formattedDate);
  const [dropdownData, setDropdownData] = useState({
    role: -1,
    subRole: "Choose Sub Role",
    experience: "Fresher",
    term: 0,
  });
  const [isDropdownOpen, setDropdownOpen] = useState({
    role: false,
    subRole: false,
    experience: false,
    term: false,
  });
  const handleDropdownChange = (dropdownName, value) => {
    setDropdownOpen((prevValues) => ({
      ...prevValues,
      [dropdownName]: value,
    }));
  };

  const handleDropdownData = (dropdownName, value) => {
    setDropdownData((prevValues) => ({
      ...prevValues,
      [dropdownName]: value,
    }));
    if (dropdownName === "role") {
      handleDropdownData("subRole", "Choose Sub Role");
      if (roleList[value].subRoles !== "NULL") {
        setSubRoleList(JSON.parse(roleList[value].subRoles));
      } else {
        setSubRoleList([]);
      }
    } else if (dropdownName === "term") {
      calculateSubscription(value);
    }
  };

  const calculateSubscription = (index) => {
    setAmount(termList[index].amount);
    currentDate.setDate(
      currentDate.getDate() + parseInt(termList[index].term, 10)
    );
    const formattedDate = currentDate.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
    setExpireDate(formattedDate);
  };

  const fetchRole = async () => {
    const response = await dbObject.get("/role/fetch-roles.php");
    if (!response.data.error) {
      setRoleList(response.data.response);
    }
  };

  const fetchSubs = async () => {
    const response = await dbObject.get("/vacancy/fetch-subscriptions.php");
    if (!response.data.error) {
      setTermList(response.data.response);
    }
  };

  async function createOrder() {
    const formData = new FormData();
    formData.append("amount", amount);
    formData.append("receipt", termList[dropdownData.term].term + " days");
    const response = await dbObject.post(
      "/razorpay/create-order.php",
      formData
    );

    return response.data.response;
  }

  const handlePayment = async () => {
    try {
      setLoading(true);
      const options = {
        key: "rzp_test_AI98lLWhXjQG7i",
        amount: amount,
        currency: "INR",
        name: "Hirehelix",
        description:
          termList[dropdownData.term].title +
          " for " +
          termList[dropdownData.term].term +
          " days",
        image: "https://hirehelix.in/logo-transparent.png",
        order_id: await createOrder(),
        handler: function (response) {
          const formData = new FormData();

          formData.append("mediaFile", _id("attachment").files[0]);
          formData.append("roleId", roleList[dropdownData.role].id);
          formData.append("subRole", dropdownData.subRole);
          formData.append("experience", dropdownData.experience);
          formData.append("salary", _id("salary").value);
          formData.append("opening", _id("opening").value);
          formData.append("requirements", _id("requirements").value);
          formData.append("ppoc", _id("ppoc").value);
          formData.append("specialRemark", _id("specialRemark").value);
          formData.append("tags", _id("tags").value);
          formData.append("term", termList[dropdownData.term].term);
          formData.append("amount", termList[dropdownData.term].amount);
          formData.append("orderId", response.razorpay_order_id);
          formData.append("paymentId", response.razorpay_payment_id);
          postVacancy(formData);
        },
        prefill: {
          name: user.fullname,
          email: user.email,
          contact: user.phone,
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#3399cc",
        },
      };
      const rzp1 = new Razorpay(options);
      rzp1.on("payment.failed", function (response) {
        alert(response.error.code);
        alert(response.error.description);
        alert(response.error.source);
        alert(response.error.step);
        alert(response.error.reason);
        alert(response.error.metadata.order_id);
        alert(response.error.metadata.payment_id);
      });
      rzp1.open();
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const postVacancy = async (formData) => {
    try {
      setLoading(true);

      const response = await dbObject.post(
        "/vacancy/post-vacancy.php",
        formData
      );
      if (!response.data.error) {
        _id("post-vacancy-form").reset();
      }
      setLoading(false);

      showAlert(response.data.message, response.data.error);
    } catch (error) {
      setLoading(false);

      showAlert("Fields are empty", response.data.error);
    }
  };

  useEffect(() => {
    fetchSubs();
    fetchRole();
  }, []);

  return (
    <FullScreenLoading isLoading={loading}>
      <Sidebar activeTab={1} />

      <MainContent>
        <h1 className="md:mx-[60px] mx-[20px] mb-2 text-lg font-semibold leading-none tracking-tight text-gray-900 md:text-3xl light:text-white">
          Post Vacancy
        </h1>
        <CompanyCard data={user ?? {}} />
        <form
          id="post-vacancy-form"
          method="POST"
          onSubmit={(e) => {
            e.preventDefault();
            if (dropdownData.role !== -1) {
              if (parseInt(termList[dropdownData.term].amount) == 0) {
                const formData = new FormData();
                formData.append("mediaFile", _id("attachment").files[0]);
                formData.append("roleId", roleList[dropdownData.role].id);
                formData.append("subRole", dropdownData.subRole);
                formData.append("experience", dropdownData.experience);
                formData.append("salary", _id("salary").value);
                formData.append("opening", _id("opening").value);
                formData.append("requirements", _id("requirements").value);
                formData.append("ppoc", _id("ppoc").value);
                formData.append("specialRemark", _id("specialRemark").value);
                formData.append("tags", _id("tags").value);
                formData.append("term", termList[dropdownData.term].term);
                formData.append("amount", termList[dropdownData.term].amount);
                formData.append("orderId", "NULL");
                formData.append("paymentId", "NULL");
                postVacancy(formData);
              } else {
                handlePayment();
              }
            } else {
              showAlert("Please select role", true);
            }
          }}
        >
          <div className="md:mx-[60px] mx-[20px] mt-[40px]">
            {/* First Row */}
            <div className="grid md:grid-cols-3 md:gap-6">
              {/* Role Dropdown */}

              <div className="relative z-2 w-full mb-6 group">
                <button
                  onClick={() => {
                    handleDropdownChange("role", !isDropdownOpen.role);
                  }}
                  id="roleDropdownBtn"
                  className="shadow-sm bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 mb-5 inline-flex items-center justify-between"
                  type="button"
                >
                  {dropdownData.role === -1
                    ? "Choose Role"
                    : roleList[dropdownData.role]?.title}
                  <svg
                    className="w-2.5 h-2.5 ml-2.5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 4 4 4-4"
                    />
                  </svg>
                </button>
                <div
                  id="roleDropdown"
                  name="roleDropdown"
                  className={`${
                    isDropdownOpen.role ? "absolute" : "hidden"
                  } max-h-[250px] overflow-auto z-10 bg-white rounded-lg shadow md:w-[230px] w-[65%] light:bg-gray-700 pt-5`}
                >
                  <ul
                    className="px-3 pb-3 overflow-y-auto text-sm text-gray-700"
                    aria-labelledby="dropdownSearchButton"
                  >
                    {roleList.map((data, index) => (
                      <li key={data.id}>
                        <div
                          className="flex cursor-pointer items-center pl-2 rounded hover:bg-gray-100 py-2"
                          onClick={() => {
                            handleDropdownData("role", index);
                            handleDropdownChange("role", false);
                          }}
                        >
                          {data.title}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Sub Role Dropdown */}
              {subRoleList.length > 0 ? (
                <div className="relative z-2 w-full mb-6 group">
                  <button
                    onClick={() => {
                      handleDropdownChange("subRole", !isDropdownOpen.subRole);
                    }}
                    id="subRoleDropdownBtn"
                    className="shadow-sm bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 mb-5 inline-flex items-center justify-between"
                    type="button"
                  >
                    {dropdownData.subRole}
                    <svg
                      className="w-2.5 h-2.5 ml-2.5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 10 6"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m1 1 4 4 4-4"
                      />
                    </svg>
                  </button>
                  <div
                    id="subRoleDropdown"
                    name="subRoleDropdown"
                    className={`${
                      isDropdownOpen.subRole ? "absolute" : "hidden"
                    } max-h-[250px] overflow-auto z-10 bg-white rounded-lg shadow md:w-[230px] w-[65%] light:bg-gray-700 pt-5`}
                  >
                    <ul
                      className="px-3 pb-3 overflow-y-auto text-sm text-gray-700"
                      aria-labelledby="dropdownSearchButton"
                    >
                      {subRoleList.map((data, index) => (
                        <li key={index}>
                          <div
                            className="flex cursor-pointer items-center pl-2 rounded hover:bg-gray-100 py-2"
                            onClick={() => {
                              handleDropdownData("subRole", data);
                              handleDropdownChange("subRole", false);
                            }}
                          >
                            {data}
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : (
                <></>
              )}

              {/* Experience Dropdown */}
              <div className="relative z-2 w-full mb-6 group">
                <button
                  onClick={() => {
                    handleDropdownChange(
                      "experience",
                      !isDropdownOpen.experience
                    );
                  }}
                  id="experienceDropdownBtn"
                  className="shadow-sm bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 mb-5 inline-flex items-center justify-between"
                  type="button"
                >
                  {dropdownData.experience}
                  <svg
                    className="w-2.5 h-2.5 ml-2.5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 4 4 4-4"
                    />
                  </svg>
                </button>
                <div
                  id="experienceDropdown"
                  name="experienceDropdown"
                  className={`${
                    isDropdownOpen.experience ? "absolute" : "hidden"
                  } max-h-[250px] overflow-auto z-10 bg-white rounded-lg shadow md:w-[230px] w-[65%] light:bg-gray-700 pt-5`}
                >
                  <ul
                    className="px-3 pb-3 overflow-y-auto text-sm text-gray-700"
                    aria-labelledby="dropdownSearchButton"
                  >
                    {experienceList.map((data, index) => (
                      <li key={index}>
                        <div
                          className="flex cursor-pointer items-center pl-2 rounded hover:bg-gray-100 py-2"
                          onClick={() => {
                            handleDropdownData("experience", data);
                            handleDropdownChange("experience", false);
                          }}
                        >
                          {data}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <KGrid crossAxisCount={3} gap={6}>
              <KTextField
                id="salary"
                name="salary"
                label="Salary"
                placeholder="Salary"
              />
              <KTextField
                id="opening"
                name="opening"
                label="Opening"
                placeholder="Opening"
              />
              <KFilePicker
                label="Choose attachment"
                name="attachment"
                id="attachment"
                accept={".pdf, .docx, .doc"}
                required={true}
              />
            </KGrid>

            <KGrid crossAxisCount={2} gap={6}>
              <KTextArea
                label="Requirements"
                id="requirements"
                name="requirements"
                rows={5}
                placeholder="Job requirements ..."
              />
              <KTextArea
                label="Special Remarks"
                id="specialRemark"
                name="specialRemark"
                rows={5}
                placeholder="Special Remarks ..."
              />
            </KGrid>

            <KGrid crossAxisCount={2} gap={6}>
              <KTextArea
                label="Preferred Point of Contact"
                id="ppoc"
                name="ppoc"
                rows={5}
                placeholder="Point of Contact ..."
              />
              <KTextArea
                label="Tags"
                id="tags"
                name="tags"
                rows={5}
                placeholder="Tags..."
              />
            </KGrid>

            {/* Sixth Row */}
            <div className="grid md:grid-cols-2 md:gap-6">
              {/* Term dropdown */}
              <div className="relative z-2 w-full mb-6 group">
                <button
                  onClick={() => {
                    handleDropdownChange("term", !isDropdownOpen.term);
                  }}
                  id="termDropdownBtn"
                  className="shadow-sm bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 mb-5 inline-flex items-center justify-between"
                  type="button"
                >
                  {termList[dropdownData.term]?.title +
                    " (" +
                    termList[dropdownData.term]?.term +
                    " days)"}
                  <svg
                    className="w-2.5 h-2.5 ml-2.5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 4 4 4-4"
                    />
                  </svg>
                </button>
                <div
                  id="termDropdown"
                  name="termDropdown"
                  className={`${
                    isDropdownOpen.term ? "absolute" : "hidden"
                  } z-10 bg-white rounded-lg shadow md:w-[230px] w-[65%] light:bg-gray-700 pt-5`}
                >
                  <ul
                    className="px-3 pb-3 overflow-y-auto text-sm text-gray-700"
                    aria-labelledby="dropdownSearchButton"
                  >
                    {termList.map((data, index) => (
                      <li key={data.id}>
                        <div
                          className="flex cursor-pointer items-center pl-2 rounded hover:bg-gray-100 py-2"
                          onClick={() => {
                            handleDropdownData("term", index);
                            handleDropdownChange("term", false);
                          }}
                        >
                          {data.title + " (" + data.term + " days)"}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-10 md:mt-0 mt-5">
                <div>
                  <h1 className="text-sm">Expires On</h1>
                  <h1 className="font-semibold">{expireDate}</h1>
                </div>

                <div className="text-end">
                  <h1 className="text-sm">Net Payable</h1>
                  <h1 className="font-semibold">₹ {amount}</h1>
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center light:bg-blue-600 light:hover:bg-blue-700 light:focus:ring-blue-800 mt-5"
              >
                Proceed to pay
              </button>
            </div>
          </div>
        </form>
      </MainContent>
    </FullScreenLoading>
  );
}

export default PostVacancy;

function CompanyCard({ data }) {
  return (
    <div className="md:mx-[60px] mx-[20px] bg-gray-100 rounded-2xl p-5 flex flex-nowrap mt-10 items-center col-span-4">
      <img
        src={data.image}
        alt=""
        className="h-20 w-20 mr-2 p-2 rounded-full"
      />

      <div className="">
        <h1 className="text-md font-bold">{data.companyName}</h1>
        <h1 className="text-sm font-medium">GSTIN: {data.gstin}</h1>
        <h1 className="max2lines text-sm">{data.bio}</h1>
      </div>
    </div>
  );
}
