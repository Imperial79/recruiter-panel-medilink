import { useContext, useEffect, useState } from "react";
import Sidebar from "../Components/Sidebar";
import MainContent from "../Components/MainContent";
import { Context } from "../Components/ContextProvider";
import AuthLoading from "../Components/AuthLoading";
import { dbObject } from "../Helper/Constants";
import FullScreenLoading from "../Components/FullScreenLoading";
import {
  KDropDown,
  KGrid,
  KTextArea,
  KTextField,
} from "../Components/components";

function ManageProfile() {
  const { user, authLoading, _id, showAlert, setUser } = useContext(Context);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [statesList, setstatesList] = useState([]);
  const [isStateDropOpen, setisStateDropOpen] = useState(false);
  const [selectedState, setselectedState] = useState("Arunachal Pradesh");
  const [city, setcity] = useState("");

  const [textField, setTextField] = useState({
    companyName: user != null ? user.companyName : "",
    pocName: user != null ? user.pocName : "",
    email: user != null ? user.email : "",
    phone: user != null ? user.phone : "",
    gstin: user != null ? user.gstin : "",
    website: user != null ? user.website : "",
    state: user != null ? user.state : "",
    city: user != null ? user.city : "",
    address: user != null ? user.address : "",
    bio: user != null ? user.bio : "",
  });

  useEffect(() => {
    if (user !== null) {
      setTextField({
        companyName: user != null ? user.companyName : "",
        pocName: user != null ? user.pocName : "",
        email: user != null ? user.email : "",
        phone: user != null ? user.phone : "",
        gstin: user != null ? user.gstin : "",
        website: user != null ? user.website : "",
        address: user != null ? user.address : "",
        state: user != null ? user.state : "",
        city: user != null ? user.city : "",
        bio: user != null ? user.bio : "",
      });

      setselectedState(user.state);
    }
  }, [user]);

  async function fetchStates() {
    try {
      const response = await dbObject.get("/states/fetch-states.php");
      if (!response.data.error) {
        setstatesList(response.data.response);
      }
    } catch (error) {}
  }

  const handleClick = () => {
    document.getElementById("imageInput").click();
  };

  async function uploadImage() {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("mediaFile", _id("imageInput").files[0]);
      const response = await dbObject.post("/users/update-dp.php", formData);
      setLoading(false);

      showAlert(response.data.message, response.data.error);
    } catch (error) {
      setLoading(false);
      showAlert(
        "Sorry for inconvenience! Please try again.",
        response.data.error
      );
    }
  }

  const handleImageChange = (event) => {
    if (event.target.files.length > 0) {
      setImagePreview(URL.createObjectURL(event.target.files[0]));
      uploadImage();
    }
  };

  const handleInputChange = (e) => {
    setTextField({
      ...textField, // Preserve existing values
      [e.target.name]: e.target.value,
    });
  };

  const updateProfile = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("companyName", _id("companyName").value);
    formData.append("pocName", _id("pocName").value);
    formData.append("email", _id("email").value);
    formData.append("website", _id("website").value);
    formData.append("address", _id("address").value);
    formData.append("state", selectedState);
    formData.append("city", _id("city").value);
    formData.append("bio", _id("bio").value);

    const response = await dbObject.post("/users/update-profile.php", formData);
    if (!response.data.error) {
      setUser(response.data.response);
    }

    showAlert(response.data.message, response.data.error);
    setLoading(false);
  };

  useEffect(() => {
    fetchStates();
  }, []);

  return (
    <>
      {authLoading || user == null ? (
        <AuthLoading />
      ) : (
        <FullScreenLoading isLoading={loading}>
          <Sidebar activeTab={3} />
          <MainContent>
            <div>
              <h1 className="md:mx-[60px] mx-[20px] mb-2 text-3xl font-semibold leading-none tracking-tight text-gray-900 md:text-3xl light:text-white">
                Manage Profile
              </h1>
              <input
                id="imageInput"
                className="hidden"
                type="file"
                accept=".jpeg, .jpg, .png, .webp"
                onChange={handleImageChange}
              />
              <button
                onClick={handleClick}
                className="md:mx-[60px] justify-center flex mx-auto mt-10 bg-gray-100 h-[100px] w-[100px] rounded-lg"
              >
                <img
                  id="imagePreview"
                  src={imagePreview ?? user.image}
                  className="h-full object-cover rounded-lg"
                />
              </button>
              <div>
                <button
                  onClick={handleClick}
                  className="md:mx-[60px] justify-center flex mx-auto mt-2 font-semibold rounded-xl text-sm text-blue-700 "
                >
                  Choose Image
                </button>
              </div>

              <div className="md:mx-[60px] mx-[20px] mt-[40px]">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    updateProfile();
                  }}
                >
                  <KGrid crossAxisCount={2} gap={6}>
                    <KTextField
                      label="Company Name"
                      id="companyName"
                      name="companyName"
                      placeholder="Enter company name"
                      value={textField.companyName}
                      onChange={(e) => {
                        handleInputChange(e);
                      }}
                    />

                    <KTextField
                      name="pocName"
                      id="pocName"
                      label="Contact person's name"
                      placeholder="Enter contact person's name"
                      value={textField.pocName}
                      onChange={(e) => {
                        handleInputChange(e);
                      }}
                    />
                  </KGrid>

                  <KGrid crossAxisCount={2} gap={6}>
                    <KTextField
                      label="E-mail"
                      type="email"
                      name="email"
                      id="email"
                      placeholder="Enter email"
                      required
                      value={textField.email}
                      onChange={(e) => {
                        handleInputChange(e);
                      }}
                    />

                    <KTextField
                      label="Phone Number"
                      type="phone"
                      name="phone"
                      id="phone"
                      maxLength={10}
                      placeholder="Enter phone number"
                      required
                      readOnly={true}
                      value={textField.phone}
                    />
                  </KGrid>

                  <KGrid crossAxisCount={2} gap={6}>
                    <KTextField
                      label="GSTIN"
                      type="text"
                      name="gstin"
                      id="gstin"
                      placeholder="Enter GST Number"
                      required
                      value={textField.gstin}
                      onChange={(e) => {
                        handleInputChange(e);
                      }}
                    />

                    <KTextField
                      label="Company Website"
                      type="text"
                      name="website"
                      id="website"
                      placeholder="Enter company website"
                      required
                      value={textField.website}
                      onChange={(e) => {
                        handleInputChange(e);
                      }}
                    />
                  </KGrid>
                  <KGrid>
                    <KDropDown id="state" name="state" label="Select State">
                      {statesList.map((data, index) => (
                        <option key={index} value={data.stateName}>
                          {data.stateName}
                        </option>
                      ))}
                    </KDropDown>

                    <KTextField
                      id="city"
                      label="City"
                      placeholder="Enter city"
                      value={textField.city}
                      onChange={(e) => {
                        handleInputChange(e);
                      }}
                    />
                  </KGrid>
                  <KGrid crossAxisCount={2} gap={6}>
                    <KTextArea
                      label="Company Address"
                      type="text"
                      name="address"
                      id="address"
                      placeholder="Enter company address"
                      required
                      onChange={(e) => {
                        handleInputChange(e);
                      }}
                      value={textField.address}
                    />

                    <KTextArea
                      label="Company Bio"
                      type="text"
                      name="bio"
                      id="bio"
                      placeholder="Enter company bio"
                      required
                      onChange={(e) => {
                        handleInputChange(e);
                      }}
                      value={textField.bio}
                    />
                  </KGrid>

                  <button
                    type="submit"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center light:bg-blue-600 light:hover:bg-blue-700 light:focus:ring-blue-800"
                  >
                    Update
                  </button>
                </form>
              </div>
            </div>
          </MainContent>
        </FullScreenLoading>
      )}
    </>
  );
}

export default ManageProfile;
