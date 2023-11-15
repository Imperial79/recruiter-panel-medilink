import React, { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import recruiter from "../assets/recruiter.svg";
import logo from "../assets/logo.jpg";
import { dbObject } from "../Helper/Constants.jsx";
import { Context } from "../Components/ContextProvider.jsx";
import AuthLoading from "../Components/AuthLoading.jsx";

function LoginPage() {
  const { setAlert, setParameter, _id, setUser, authLoading } =
    useContext(Context);

  const [action, setAction] = useState("");
  const navigator = useNavigate();

  const sendOTP = async () => {
    const formData = new FormData();
    formData.append("phone", _id("phone").value);

    const response = await dbObject.post("/sms-service/send-otp.php", formData);

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

  return (
    <>
      {authLoading ? (
        <AuthLoading />
      ) : (
        <div className="pt-10 md:px-10 md:pb-10 text-black ">
          <div className="drop-shadow-xl bg-gray-50 p-2 rounded-[20px] md:w-[60%] md:mx-auto m-5  md:flex">
            <img
              src={recruiter}
              alt=""
              className="md:w-[40%] my-20 mx-20 hidden md:block"
            />

            <div className="bg-white border-gray-100 border rounded-[20px] py-10 px-10 items-center justify-center md:w-1/2">
              <img src={logo} alt="" className="md:w-full w-[200px] mx-auto" />
              <p className="text-sm text-center">For recruiters</p>
              <h1 className="mt-10 text-[25px] font-semibold mx-auto text-center">
                Welcome back!
              </h1>
              <h1 className="text-[15px] text-gray-500 font-normal text-center">
                Enter your details
              </h1>

              <div className="mt-5 relative z-0 w-full mb-6 group">
                <input
                  type="phone"
                  name="phone"
                  id="phone"
                  maxLength={10}
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none light:text-white light:border-gray-600 light:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                />
                <label
                  htmlFor="phone"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 light:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:light:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Phone
                </label>
              </div>

              <div className="mt-5 relative z-0 w-full mb-4 group">
                <input
                  type="text"
                  name="otp"
                  id="otp"
                  maxLength={5}
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none light:text-white light:border-gray-600 light:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer tracking-[10px]"
                  placeholder=" "
                  required
                />
                <label
                  htmlFor="otp"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 light:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:light:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  OTP
                </label>
              </div>

              {/* <div className="flex space-x-4 items-center justify-center">
              {inputRefs.map((inputRef, index) => (
                <input
                  key={index}
                  type="text"
                  className="w-12 h-12 text-center border rounded-lg focus:outline-none"
                  placeholder={index + 1}
                  maxLength={1}
                  ref={inputRef}
                  onChange={(e) => handleInputChange(e, index)}
                />
              ))}
            </div> */}

              <button
                onClick={sendOTP}
                className="text-blue-700 font-medium hover:text-blue-400 hover:underline rounded-full"
              >
                Send OTP
              </button>

              <button
                onClick={() => {
                  if (action === "Register") {
                    setParameter({
                      origin: "login",
                      body: {
                        phone: _id("phone").value,
                        otp: otp,
                      },
                    });
                    navigator("/register");
                  } else if (action === "Login") {
                    login();
                  } else {
                    setAlert({
                      content: "Get OTP to verify",
                      isDanger: true,
                    });
                  }
                }}
                type="button"
                className="mt-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center"
              >
                Proceed
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default LoginPage;
