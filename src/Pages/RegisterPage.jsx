
import React, { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import recruiter from "../assets/recruiter.svg";
import logo from "../assets/logo.jpg";
import { dbObject } from "../Helper/Constants.jsx";
import { Context } from "../Components/ContextProvider.jsx";

const RegisterPage = () => {

    const { _id, parameter, setParameter, setUser } = useContext(Context);

    const register = async () => {
        console.log(parameter);
        try {
            let formData = new FormData();
            formData.append("companyName", _id("companyName").value)
            formData.append("poc", _id("poc").value)
            formData.append("gstin", _id("gstin").value)
            formData.append("phone", _id("phone").value)
            formData.append("email", _id("email").value)
            formData.append("address", _id("address").value)
            formData.append("website", _id("website").value)
            formData.append("bio", _id("bio").value)
            formData.append("otp", parameter.body.otp)
            const response = await dbObject.post("/users/register.php", formData);
            console.log(response);
            if (!response.data.error) {
                setUser(response.data.response)
            }
            setAlert({

                content: response.data["message"],
                isDanger: response.data["error"],
            });
        } catch (error) {
            console.log(error);
        }

    }

    return (
        <div className="pt-10 md:pb-10 text-black ">
            <div className="drop-shadow-xl bg-gray-50 p-2 rounded-[20px] md:w-[80%] md:mx-auto m-5 md:flex">
                <img
                    src={recruiter}
                    alt=""
                    className="md:w-[40%] my-20 mx-20 hidden md:block"
                />

                <div className="bg-white border-gray-100 border rounded-[20px] items-center justify-center md:w-1/2">
                    <img src={logo} alt="" className="md:w-[200px] w-[50px] mx-auto mt-5" />
                    <p className="text-xl font-semibold text-center">Register</p>




                    <div className="md:mx-[20px] mx-[20px] mt-[40px]">
                        <form>
                            <div class="relative z-0 w-full mb-6 group">
                                <input
                                    type="phone"
                                    name="phone"
                                    id="phone"
                                    class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none light:text-white light:border-gray-600 light:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                    placeholder=" "
                                    required
                                    readOnly
                                    value={parameter.body.phone}
                                />
                                <label
                                    for="phone"
                                    class="peer-focus:font-medium absolute text-sm text-gray-500 light:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:light:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"

                                >
                                    Phone
                                </label>
                            </div>
                            <div class="relative z-0 w-full mb-6 group">
                                <input
                                    type="text"
                                    name="companyName"
                                    id="companyName"
                                    class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none light:text-white light:border-gray-600 light:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                    placeholder=" "
                                    required
                                />
                                <label
                                    for="companyName"
                                    class="peer-focus:font-medium absolute text-sm text-gray-500 light:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:light:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                >
                                    Company Name
                                </label>
                            </div>
                            <div class="relative z-0 w-full mb-6 group">
                                <input
                                    type="text"
                                    name="poc"
                                    id="poc"
                                    class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none light:text-white light:border-gray-600 light:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                    placeholder=" "
                                    required
                                />
                                <label
                                    for="poc"
                                    class="peer-focus:font-medium absolute text-sm text-gray-500 light:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:light:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                >
                                    Contact person's name
                                </label>
                            </div>
                            <div class="relative z-0 w-full mb-6 group">
                                <input
                                    type="text"
                                    name="gstin"
                                    id="gstin"
                                    class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none light:text-white light:border-gray-600 light:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                    placeholder=" "
                                    required
                                />
                                <label
                                    for="gstin"
                                    class="peer-focus:font-medium absolute text-sm text-gray-500 light:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:light:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                >
                                    GSTIN
                                </label>
                            </div>

                            <div class="relative z-0 w-full mb-6 group">
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none light:text-white light:border-gray-600 light:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                    placeholder=" "
                                    required
                                />
                                <label
                                    for="email"
                                    class="peer-focus:font-medium absolute text-sm text-gray-500 light:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:light:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                >
                                    Email
                                </label>
                            </div>


                            <div class="relative z-0 w-full mb-6 group">
                                <input
                                    type="text"
                                    name="website"
                                    id="website"
                                    class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none light:text-white light:border-gray-600 light:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                    placeholder=" "
                                    required
                                />
                                <label
                                    for="website"
                                    class="peer-focus:font-medium absolute text-sm text-gray-500 light:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:light:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                >
                                    Website
                                </label>
                            </div>

                            <div class="relative z-0 w-full mb-6 group">
                                <textarea
                                    type="text"
                                    name="address"
                                    id="address"
                                    class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none light:text-white light:border-gray-600 light:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                    placeholder=" "
                                    required
                                ></textarea>
                                <label
                                    for="address"
                                    class="peer-focus:font-medium absolute text-sm text-gray-500 light:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:light:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                >
                                    Address
                                </label>
                            </div>


                            <div class="relative z-0 w-full mb-6 group">
                                <textarea
                                    type="text"
                                    name="bio"
                                    id="bio"
                                    class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none light:text-white light:border-gray-600 light:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                    placeholder=" "
                                    required
                                ></textarea>
                                <label
                                    for="bio"
                                    class="peer-focus:font-medium absolute text-sm text-gray-500 light:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:light:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                >
                                    Bio
                                </label>
                            </div>

                        </form>
                        <button
                            onClick={register}
                            type="button"
                            className="my-10 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center"
                        >
                            Register
                        </button>
                    </div>



                </div>
            </div>
        </div>
    );
}





export default RegisterPage;