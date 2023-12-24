import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import recruiter from "../assets/recruiter.svg";
import logo from "../assets/logo.jpg";
import { dbObject } from "../Helper/Constants.jsx";
import { Context } from "../Components/ContextProvider.jsx";
import Loading from "../Components/Loading.jsx";
import {
  KDropDown,
  KDropdownItem,
  KGrid,
  KTextArea,
  KTextField,
} from "../Components/components.jsx";

const RegisterPage = () => {
  const { _id, setAlert, parameter, setParameter, setUser } =
    useContext(Context);
  const [loading, setLoading] = useState(false);
  const [statesList, setstatesList] = useState([]);
  const [isStateDropOpen, setisStateDropOpen] = useState(false);
  const [selectedState, setselectedState] = useState("Arunachal Pradesh");
  const [city, setcity] = useState("");

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
      formData.append("state", selectedState);
      formData.append("city", _id("city").value);
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

  async function fetchStates() {
    try {
      const response = await dbObject.get("/states/fetch-states.php");
      if (!response.data.error) {
        setstatesList(response.data.response);
      }
    } catch (error) {}
  }

  useEffect(() => {
    fetchStates();
  }, []);

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

            <div className="bg-white border-gray-100 border rounded-[20px] items-center justify-center md:w-1/2 p-5">
              <img
                src={logo}
                alt=""
                className="md:w-[200px] w-[50px] mx-auto mt-5"
              />
              <p className="text-xl font-semibold text-center">Register</p>

              <div className="relative z-0 w-full mb-6 group">
                <KTextField
                  type="number"
                  label="Phone"
                  name="phone"
                  id="phone"
                  placeholder="Enter phone number"
                  required
                  readOnly
                  value={parameter.body.phone}
                />

                <div className="relative z-0 w-full mb-6 group">
                  <KTextField
                    type="text"
                    name="companyName"
                    id="companyName"
                    label="Company Name"
                    placeholder="Enter Company Name"
                    required
                  />
                </div>

                <KTextField
                  type="text"
                  name="poc"
                  id="poc"
                  label="Contact person's name"
                  placeholder="Enter contact person's name"
                  required
                />

                <KTextField
                  type="text"
                  name="gstin"
                  id="gstin"
                  label="GSTIN"
                  placeholder="Enter GST Number"
                  required
                />

                <KTextField
                  type="email"
                  name="email"
                  id="email"
                  label="E-mail"
                  placeholder="Enter email"
                  required
                />

                <KTextField
                  type="text"
                  name="website"
                  id="website"
                  label="Website"
                  placeholder="Enter official website link"
                  required
                />
                <KGrid>
                  <KDropDown
                    value={selectedState}
                    id={"state"}
                    onClick={() => {
                      setisStateDropOpen(!isStateDropOpen);
                    }}
                    isDropDownOpen={isStateDropOpen}
                    label={"Select State"}
                  >
                    {statesList.map((data, index) => (
                      <div key={index}>
                        <KDropdownItem
                          label={data.stateName}
                          onClick={() => {
                            setselectedState(data.stateName);
                            setisStateDropOpen(!isStateDropOpen);
                          }}
                        />
                      </div>
                    ))}
                  </KDropDown>

                  <KTextField id="city" label="City" placeholder="Enter city" />
                </KGrid>
                <KTextArea
                  type="text"
                  name="address"
                  id="address"
                  label="Address"
                  placeholder="Enter company address"
                  required
                />

                <KTextArea
                  type="text"
                  name="bio"
                  id="bio"
                  label="Bio"
                  placeholder="Enter Company Bio"
                  required
                />

                <button
                  type="submit"
                  className="my-5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center"
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
