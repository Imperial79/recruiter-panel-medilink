import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import recruiter from "../assets/recruiter.svg";
import logo from "../assets/logo.jpg";
import { dbObject } from "../Helper/Constants.jsx";
import { Context } from "../Components/ContextProvider.jsx";
import AuthLoading from "../Components/AuthLoading.jsx";
import { KTextField } from "../Components/components.jsx";
import CircularProgressIndicator from "../Components/CircularProgressIndicator.jsx";
import Scaffold from "../Components/Scaffold.jsx";

function LoginPage() {
  const { showAlert, setParameter, _id, setUser, authLoading } =
    useContext(Context);
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(60); // Initial timer value in seconds
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  const [action, setAction] = useState("");
  const navigator = useNavigate();

  // Function to start the timer
  const startTimer = () => {
    setTimer(60);
    setIsTimerRunning(true);
  };

  // Effect to handle the timer countdown
  useEffect(() => {
    let countdown;
    if (isTimerRunning && timer > 0) {
      countdown = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    }

    return () => {
      clearInterval(countdown);
    };
  }, [isTimerRunning, timer]);

  // Effect to handle the timer reaching zero
  useEffect(() => {
    if (timer === 0) {
      setIsTimerRunning(false);
    }
  }, [timer]);

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
        startTimer();
        setAction(response.data["response"]);
      }
      showAlert(response.data.message, response.data.error);
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
      }
      showAlert(response.data.message, response.data.error);
    } else {
      showAlert("Enter OTP to proceed", true);
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
        showAlert(response.data.message, response.data.error);
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
        <Scaffold isLoading={loading}>
          <div className="flex flex-col justify-center h-screen px-2">
            <div className="bg-gray-100 pr-2 md:pl-10 pl-2 py-2 max-w-5xl mx-auto rounded-xl w-full">
              <div className="md:flex justify-between gap-10 items-center">
                <div className="h-[300px] w-[300px] flex-shrink-0 hidden md:block mx-auto">
                  <img src={recruiter} alt="recruiter-image" />
                </div>

                <div className="bg-white md:p-10 p-5 rounded-xl md:w-[500px]">
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();

                      if (action === "Register") {
                        verifyOtp();
                      } else if (action === "Login") {
                        login();
                      } else {
                        showAlert("Get OTP to verify", true);
                      }
                    }}
                  >
                    <div>
                      <img
                        src={logo}
                        alt="logo"
                        className="w-[200px] mx-auto"
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
                        pattern="^[0-9]{1,10}$"
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

                      {isTimerRunning ? (
                        <div className="flex items-center">
                          <CircularProgressIndicator size={5} margin="mr-2" />
                          <h1 className="text-sm text-gray-500 font-medium">
                            Resend OTP in {timer} secs
                          </h1>
                        </div>
                      ) : (
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
                      )}

                      <button
                        type="submit"
                        className="mt-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center disabled:bg-gray-300"
                      >
                        Proceed
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </Scaffold>
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
