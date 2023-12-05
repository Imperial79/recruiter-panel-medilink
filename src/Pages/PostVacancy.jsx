import React, { useContext, useEffect, useState } from "react";
import MainContent from "../Components/MainContent";
import Sidebar from "../Components/Sidebar";
import { Context } from "../Components/ContextProvider";
import { dbObject, experienceList } from "../Helper/Constants";
import useRazorpay from "react-razorpay";
import FullScreenLoading from "../Components/FullScreenLoading";

function PostVacancy() {
  const { user, _id, setAlert } = useContext(Context);
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
    role: 0,
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
      setSubRoleList(JSON.parse(roleList[value].subRoles));
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
    console.log(response.data);
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

    console.log(response);
    return response.data.response;
  }

  const handlePayment = async () => {
    try {
      setLoading(true);
      const options = {
        key: "rzp_test_AI98lLWhXjQG7i",
        amount: amount,
        currency: "INR",
        name: "Medilink",
        description:
          termList[dropdownData.term].title +
          " for " +
          termList[dropdownData.term].term +
          " days",
        image: "https://recruiter.shapon.tech/assets/logo-97c3ce9b.jpg",
        order_id: await createOrder(),
        handler: function (response) {
          // console.log(response.razorpay_signature);
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
      setAlert({
        content: response.data.message,
        isDanger: response.data.error,
      });
    } catch (error) {
      setLoading(false);
      setAlert({
        content: "Fields are empty",
        isDanger: true,
      });
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
          onSubmit={(e) => {
            e.preventDefault();
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
          }}
        >
          <div className="md:mx-[60px] mx-[20px] mt-[40px]">
            {/* First Row */}
            <div className="grid md:grid-cols-3 md:gap-6">
              {/* Role Dropdown */}
              <div className="relative z-0 w-full mb-6 group">
                <button
                  onClick={() => {
                    handleDropdownChange("role", !isDropdownOpen.role);
                  }}
                  id="roleDropdownBtn"
                  className="inline-flex justify-between py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none light:text-white light:border-gray-600 light:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer items-center"
                  type="button"
                >
                  {roleList[dropdownData.role]?.title}
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
                  } z-10 bg-white rounded-lg shadow md:w-[230px] w-[65%] light:bg-gray-700 pt-5`}
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
              <div className="relative z-0 w-full mb-6 group">
                <button
                  onClick={() => {
                    handleDropdownChange("subRole", !isDropdownOpen.subRole);
                  }}
                  id="subRoleDropdownBtn"
                  className="inline-flex justify-between py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none light:text-white light:border-gray-600 light:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer items-center"
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
                  } z-10 bg-white rounded-lg shadow md:w-[230px] w-[65%] light:bg-gray-700 pt-5`}
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

              {/* Experience Dropdown */}
              <div className="relative z-0 w-full mb-6 group">
                <button
                  onClick={() => {
                    handleDropdownChange(
                      "experience",
                      !isDropdownOpen.experience
                    );
                  }}
                  id="experienceDropdownBtn"
                  className="inline-flex justify-between py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none light:text-white light:border-gray-600 light:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer items-center"
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
                  } z-10 bg-white rounded-lg shadow md:w-[230px] w-[65%] light:bg-gray-700 pt-5`}
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

            {/* Second Row */}
            <div className="grid md:grid-cols-3 md:gap-6">
              {/* Salary */}
              <div className="relative z-0 w-full mb-6 group">
                <input
                  type="text"
                  name="salary"
                  id="salary"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none light:text-white light:border-gray-600 light:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=""
                  required
                />
                <label
                  htmlFor="salary"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 light:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:light:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Salary
                </label>
              </div>

              {/* Opening */}
              <div className="relative z-0 w-full mb-6 group">
                <input
                  type="text"
                  name="opening"
                  id="opening"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none light:text-white light:border-gray-600 light:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                />
                <label
                  htmlFor="opening"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 light:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:light:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Opening
                </label>
              </div>

              {/* Attachment */}
              <div className="relative z-0 w-full mb-6 group">
                <input
                  type="file"
                  name="attachment"
                  id="attachment"
                  className="block  px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none light:text-white light:border-gray-600 light:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                />
              </div>
            </div>

            {/* Thrid Row */}
            <div className="relative z-0 w-full mb-6 group">
              {/* Requirement */}
              <textarea
                name="requirements"
                id="requirements"
                rows={7}
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none light:text-white light:border-gray-600 light:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
              />
              <label
                htmlFor="requirements"
                className="peer-focus:font-medium absolute text-sm text-gray-500 light:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:light:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Requirements
              </label>
            </div>

            {/* Fourth Row */}
            <div className="relative z-0 w-full mb-6 group">
              {/* Special Remarks */}
              <textarea
                name="specialRemark"
                id="specialRemark"
                rows={4}
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none light:text-white light:border-gray-600 light:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
              />
              <label
                htmlFor="specialRemark"
                className="peer-focus:font-medium absolute text-sm text-gray-500 light:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:light:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Special Remarks
              </label>
            </div>

            {/* Fifth Row */}
            <div className="grid md:grid-cols-2 md:gap-6">
              {/* PPOC */}
              <div className="relative z-0 w-full mb-6 group">
                <textarea
                  name="ppoc"
                  id="ppoc"
                  rows={3}
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none light:text-white light:border-gray-600 light:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                />
                <label
                  htmlFor="ppoc"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 light:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:light:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Preferred Point of Contact
                </label>
              </div>

              {/* Tags */}
              <div className="relative z-0 w-full mb-6 group">
                <textarea
                  name="tags"
                  id="tags"
                  rows={3}
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none light:text-white light:border-gray-600 light:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                />
                <label
                  htmlFor="tags"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 light:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:light:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Tags
                </label>
              </div>
            </div>

            {/* Sixth Row */}
            <div className="grid md:grid-cols-2 md:gap-6">
              {/* Term dropdown */}
              <div className="relative z-0 w-full mb-6 group">
                <button
                  onClick={() => {
                    handleDropdownChange("term", !isDropdownOpen.term);
                  }}
                  id="termDropdownBtn"
                  className="inline-flex justify-between py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none light:text-white light:border-gray-600 light:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer items-center"
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
            <br />

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

function DropdownButton({ onClick, label, term }) {
  return (
    <button
      onClick={onClick}
      className="px-4 py-2 hover:bg-gray-100 light:hover:bg-gray-600 light:hover:text-white w-full text-start flex items-center justify-between"
    >
      <h1>{label}</h1>
      <h1>{term}</h1>
    </button>
  );
}
