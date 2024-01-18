import React, { useContext, useEffect, useState } from "react";
import MainContent from "../Components/MainContent";
import Sidebar from "../Components/Sidebar";
import { Context } from "../Components/ContextProvider";
import { dbObject, experienceList } from "../Helper/Constants";
import useRazorpay from "react-razorpay";
import FullScreenLoading from "../Components/FullScreenLoading";
import {
  KDropDown,
  KFilePicker,
  KGrid,
  KTextArea,
  KTextField,
} from "../Components/components";
import Scaffold from "../Components/Scaffold";

function PostVacancy() {
  const { user, _id, showAlert } = useContext(Context);
  const [subscriptionList, setSubscriptionList] = useState([]);
  const [roleList, setRoleList] = useState([]);
  const [subRoleList, setSubRoleList] = useState(["Select Sub-Role"]);
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

  const calculateSubscription = () => {
    setAmount(subscriptionList[_id("term").value].amount);
    currentDate.setDate(
      currentDate.getDate() +
        parseInt(subscriptionList[_id("term").value].term, 10)
    );
    const formattedDate = currentDate.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
    setExpireDate(formattedDate);
  };

  const changeSubCategory = (index) => {
    if (roleList[index].subRoles !== "NULL") {
      setSubRoleList(JSON.parse(roleList[index].subRoles));
    } else {
      setSubRoleList([]);
    }
  };

  const fetchRole = async () => {
    const response = await dbObject.get("/role/fetch-roles.php");
    if (!response.data.error) {
      setRoleList(response.data.response);
    }
  };

  const fetchSubscriptions = async () => {
    const response = await dbObject.get("/vacancy/fetch-subscriptions.php");
    if (!response.data.error) {
      setSubscriptionList(response.data.response);
    }
  };

  async function createOrder() {
    const formData = new FormData();
    formData.append("amount", amount);
    formData.append(
      "receipt",
      subscriptionList[_id("term").value].term + " days"
    );
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
          subscriptionList[_id("term").value].title +
          " for " +
          subscriptionList[_id("term").value].term +
          " days",
        image: "https://hirehelix.in/logo-transparent.png",
        order_id: await createOrder(),
        handler: function (response) {
          const formData = new FormData();

          formData.append("mediaFile", _id("attachment").files[0]);
          formData.append("roleId", roleList[_id("role").value].id);
          formData.append("subRole", _id("subRole").value);
          formData.append("experience", _id("experience").value);
          formData.append("salary", _id("salary").value);
          formData.append("opening", _id("opening").value);
          formData.append("requirements", _id("requirements").value);
          formData.append("ppoc", _id("ppoc").value);
          formData.append("specialRemark", _id("specialRemark").value);
          formData.append("tags", _id("tags").value);
          formData.append("term", subscriptionList[_id("term").value].term);
          formData.append("amount", subscriptionList[_id("term").value].amount);
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
    fetchSubscriptions();
    fetchRole();
  }, []);

  return (
    <Scaffold isLoading={loading}>
      <MainContent>
        <h1 className="md:mx-[60px] mx-[20px] mb-2 text-3xl font-semibold leading-none tracking-tight text-gray-900 md:text-3xl light:text-white">
          Post Vacancy
        </h1>
        <CompanyCard data={user ?? {}} />
        <form
          id="post-vacancy-form"
          method="POST"
          onSubmit={(e) => {
            e.preventDefault();
            if (
              subRoleList.length > 0 &&
              _id("subRole").value === "Select Sub-Role"
            ) {
              showAlert("Select Sub-Role", true);
              return;
            }

            if (parseInt(subscriptionList[_id("term").value].amount) == 0) {
              const formData = new FormData();
              formData.append("mediaFile", _id("attachment").files[0]);
              formData.append("roleId", roleList[_id("role").value].id);
              formData.append(
                "subRole",
                _id("subRole") ? _id("subRole").value : ""
              );
              formData.append("experience", _id("experience").value);
              formData.append("salary", _id("salary").value);
              formData.append("opening", _id("opening").value);
              formData.append("requirements", _id("requirements").value);
              formData.append("ppoc", _id("ppoc").value);
              formData.append("specialRemark", _id("specialRemark").value);
              formData.append("tags", _id("tags").value);
              formData.append("term", subscriptionList[_id("term").value].term);
              formData.append(
                "amount",
                subscriptionList[_id("term").value].amount
              );
              formData.append("orderId", "NULL");
              formData.append("paymentId", "NULL");
              postVacancy(formData);
            } else {
              handlePayment();
            }
          }}
        >
          <div className="md:mx-[60px] mx-[20px] mt-[40px]">
            <KGrid crossAxisCount={3} gap={5}>
              <KDropDown
                id="role"
                name="role"
                label="Select Role"
                onChange={(e) => {
                  changeSubCategory(e.target.value);
                }}
              >
                {roleList.map((data, index) => (
                  <option key={index} value={index}>
                    {data.title}
                  </option>
                ))}
              </KDropDown>

              {subRoleList.length > 0 ? (
                <KDropDown id="subRole" name="subRole" label="Select Sub-Role">
                  {subRoleList.map((data, index) => (
                    <option key={index} value={data}>
                      {data}
                    </option>
                  ))}
                </KDropDown>
              ) : (
                <></>
              )}

              <KDropDown
                id="experience"
                name="experience"
                label="Select Experience"
              >
                {experienceList.map((data, index) => (
                  <option key={index} value={data}>
                    {data}
                  </option>
                ))}
              </KDropDown>
            </KGrid>

            <KGrid crossAxisCount={3} gap={5}>
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

            <KGrid crossAxisCount={2} gap={5}>
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

            <KGrid crossAxisCount={2} gap={5}>
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
              <KDropDown
                id="term"
                name="term"
                label="Select Subscription"
                onChange={calculateSubscription}
              >
                {subscriptionList.map((data, index) => (
                  <option key={index} value={index}>
                    {data.title + " (" + data.term + " days)"}
                  </option>
                ))}
              </KDropDown>

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
    </Scaffold>
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
