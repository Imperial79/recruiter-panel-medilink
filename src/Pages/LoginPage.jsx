import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import recruiter from "../assets/recruiter.svg";
import logo from "../assets/logo.jpg";
import { dbObject } from "../Helper/Constants.jsx";
import { Context } from "../Components/ContextProvider.jsx";
import AuthLoading from "../Components/AuthLoading.jsx";
import Loading from "../Components/Loading.jsx";
import { KTextField } from "../Components/components.jsx";

function LoginPage() {
  const { setAlert, setParameter, _id, setUser, authLoading } =
    useContext(Context);
  const [loading, setLoading] = useState(false);

  const [action, setAction] = useState("");
  const navigator = useNavigate();

  const sendOTP = async () => {
    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("phone", _id("phone").value);

      const response = await dbObject.post(
        "/sms-service/send-otp.php",
        formData
      );

      if (!response.data["error"]) {
        setAction(response.data["response"]);
        setAlert({
          content: response.data["message"],
          isDanger: response.data["error"],
        });
      } else {
        setAlert({
          content: response.data["message"],
          isDanger: response.data["error"],
        });
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const login = async () => {
    if (_id("otp").value.length === 5) {
      const formData = new FormData();
      formData.append("phone", _id("phone").value);
      formData.append("otp", _id("otp").value);

      const response = await dbObject.post("/users/login.php", formData);

      if (!response.data.error) {
        setUser(response.data.response);
        navigator("/dashboard");
        setAlert({
          content: response.data["message"],
          isDanger: response.data.error,
        });
      } else {
        setAlert({
          content: response.data["message"],
          isDanger: response.data.error,
        });
      }
    } else {
      setAlert({
        content: "Enter OTP to proceed",
        isDanger: true,
      });
    }
  };

  async function verifyOtp() {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("phone", _id("phone").value);
      formData.append("otp", _id("otp").value);
      const response = await dbObject.post(
        "/sms-service/verify-otp.php",
        formData
      );
      if (!response.data.error) {
        setParameter({
          origin: "login",
          body: {
            phone: _id("phone").value,
            otp: _id("otp").value,
          },
        });
        navigator("/register");
      } else {
        setAlert({
          content: response.data.message,
          isDanger: true,
        });
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  }

  return (
    <>
      {authLoading ? (
        <AuthLoading />
      ) : (
        <div className="relative">
          <div
            className={`w-full z-50 h-screen bg-white opacity-75 ${
              loading ? "absolute" : "hidden"
            }`}
          >
            <Loading />
          </div>

          <div className="pt-10 md:px-10 md:pb-10 text-black ">
            <FormCard
              onSubmit={(e) => {
                e.preventDefault();

                if (action === "Register") {
                  verifyOtp();
                } else if (action === "Login") {
                  login();
                } else {
                  setAlert({
                    content: "Get OTP to verify",
                    isDanger: true,
                  });
                }
              }}
            >
              <img
                src={recruiter}
                alt="loginImage"
                className="md:w-[40%] my-20 mx-20 hidden md:block"
              />

              <div className="bg-white border-gray-100 border rounded-[20px] py-10 px-10 items-center">
                <img
                  src={logo}
                  alt="logo"
                  className="md:w-full w-[200px] mx-auto"
                />

                <p className="text-sm text-center">For recruiters</p>
                <h1 className="mt-10 text-[25px] font-semibold mx-auto text-center">
                  Welcome back!
                </h1>
                <h1 className="text-[15px] text-gray-500 font-normal text-center">
                  Enter your details
                </h1>

                <KTextField
                  label="Phone"
                  name="phone"
                  id="phone"
                  type="phone"
                  placeholder="Enter phone number"
                  maxLength={10}
                />
                <KTextField
                  label="OTP"
                  name="otp"
                  id="otp"
                  type="text"
                  placeholder="XXXXX"
                  maxLength={5}
                  spacing="[10px]"
                />

                <button
                  onClick={(e) => {
                    e.preventDefault();
                    sendOTP();
                  }}
                  type="button"
                  className="text-blue-700 font-medium hover:text-blue-400 hover:underline rounded-full"
                >
                  Send OTP
                </button>

                <button
                  // onClick={() => {}}
                  type="submit"
                  className="mt-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center"
                >
                  Proceed
                </button>
              </div>
            </FormCard>
          </div>
        </div>
      )}
    </>
  );
}

export default LoginPage;

function FormCard({ children, onSubmit }) {
  return (
    <form
      onSubmit={onSubmit}
      method="post"
      className="bg-gray-50 p-2 rounded-[20px] md:max-w-[900px] md:mx-auto m-5 md:flex"
    >
      {children}
    </form>
  );
}
