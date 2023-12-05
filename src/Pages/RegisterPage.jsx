import React, { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import recruiter from "../assets/recruiter.svg";
import logo from "../assets/logo.jpg";
import { dbObject } from "../Helper/Constants.jsx";
import { Context } from "../Components/ContextProvider.jsx";
import Loading from "../Components/Loading.jsx";

const RegisterPage = () => {
  const { _id, setAlert, parameter, setParameter, setUser } =
    useContext(Context);
  const [loading, setLoading] = useState(false);

  const navigator = useNavigate();
  const register = async () => {
    try {
      setLoading(true);
      let formData = new FormData();
      formData.append("companyName", _id("companyName").value);
      formData.append("poc", _id("poc").value);
      formData.append("gstin", _id("gstin").value);
      formData.append("phone", _id("phone").value);
      formData.append("email", _id("email").value);
      formData.append("address", _id("address").value);
      formData.append("website", _id("website").value);
      formData.append("bio", _id("bio").value);
      formData.append("otp", parameter.body.otp);
      const response = await dbObject.post("/users/register.php", formData);
      if (!response.data.error) {
        setUser(response.data.response);
        navigator("/dashboard");
      }

      setLoading(false);
      setAlert({
        content: response.data["message"],
        isDanger: response.data["error"],
      });
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <div className="relative">
      <div
        className={`w-full z-50 h-screen bg-white opacity-75 ${
          loading ? "absolute" : "hidden"
        }`}
      >
        <Loading />
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          register();
        }}
      >
        <div className="pt-10 md:pb-10 text-black ">
          <div className="drop-shadow-xl bg-gray-50 p-2 rounded-[20px] md:w-[80%] md:mx-auto m-5 md:flex">
            <img
              src={recruiter}
              alt=""
              className="md:w-[40%] my-20 mx-20 hidden md:block"
            />

            <div className="bg-white border-gray-100 border rounded-[20px] items-center justify-center md:w-1/2">
              <img
                src={logo}
                alt=""
                className="md:w-[200px] w-[50px] mx-auto mt-5"
              />
              <p className="text-xl font-semibold text-center">Register</p>

              <div className="md:mx-[20px] mx-[20px] mt-[40px]">

                  <div className="relative z-0 w-full mb-6 group">
                    <input
                      type="number"
                      name="phone"
                      id="phone"
                      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none light:text-white light:border-gray-600 light:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder=" "
                      required
                      readOnly
                      value={parameter.body.phone}
                    />
                    <label
                      htmlFor="phone"
                      className="peer-focus:font-medium absolute text-sm text-gray-500 light:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:light:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                      Phone
                    </label>
                  </div>

                  <div className="relative z-0 w-full mb-6 group">
                    <input
                      type="text"
                      name="companyName"
                      id="companyName"
                      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none light:text-white light:border-gray-600 light:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder=" "
                      required
                    />
                    <label
                      htmlFor="companyName"
                      className="peer-focus:font-medium absolute text-sm text-gray-500 light:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:light:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                      Company Name
                    </label>
                  </div>

                  <div className="relative z-0 w-full mb-6 group">
                    <input
                      type="text"
                      name="poc"
                      id="poc"
                      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none light:text-white light:border-gray-600 light:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder=" "
                      required
                    />
                    <label
                      htmlFor="poc"
                      className="peer-focus:font-medium absolute text-sm text-gray-500 light:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:light:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                      Contact person's name
                    </label>
                  </div>

                  <div className="relative z-0 w-full mb-6 group">
                    <input
                      type="text"
                      name="gstin"
                      id="gstin"
                      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none light:text-white light:border-gray-600 light:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder=" "
                      required
                    />
                    <label
                      htmlFor="gstin"
                      className="peer-focus:font-medium absolute text-sm text-gray-500 light:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:light:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                      GSTIN
                    </label>
                  </div>

                  <div className="relative z-0 w-full mb-6 group">
                    <input
                      type="email"
                      name="email"
                      id="email"
                      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none light:text-white light:border-gray-600 light:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder=" "
                      required
                    />
                    <label
                      htmlFor="email"
                      className="peer-focus:font-medium absolute text-sm text-gray-500 light:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:light:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                      Email
                    </label>
                  </div>

                  <div className="relative z-0 w-full mb-6 group">
                    <input
                      type="text"
                      name="website"
                      id="website"
                      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none light:text-white light:border-gray-600 light:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder=" "
                      required
                    />
                    <label
                      htmlFor="website"
                      className="peer-focus:font-medium absolute text-sm text-gray-500 light:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:light:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                      Website
                    </label>
                  </div>

                  <div className="relative z-0 w-full mb-6 group">
                    <textarea
                      type="text"
                      name="address"
                      id="address"
                      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none light:text-white light:border-gray-600 light:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder=" "
                      required
                    ></textarea>
                    <label
                      htmlFor="address"
                      className="peer-focus:font-medium absolute text-sm text-gray-500 light:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:light:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                      Address
                    </label>
                  </div>

                  <div className="relative z-0 w-full mb-6 group">
                    <textarea
                      type="text"
                      name="bio"
                      id="bio"
                      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none light:text-white light:border-gray-600 light:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder=" "
                      required
                    ></textarea>
                    <label
                      htmlFor="bio"
                      className="peer-focus:font-medium absolute text-sm text-gray-500 light:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:light:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                      Bio
                    </label>
                  </div>
               
                <button
                  type="submit"
                  className="my-10 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center"
                >
                  Register
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default RegisterPage;
