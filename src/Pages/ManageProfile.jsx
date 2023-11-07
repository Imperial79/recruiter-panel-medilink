import { useContext, useState } from "react";
import Sidebar from "../Components/Sidebar";
import MainContent from "../Components/MainContent";
import gallery from "../assets/gallery.svg";
import { Context } from "../Components/ContextProvider";
import AuthLoading from "../Components/AuthLoading";
import { dbObject } from "../Helper/Constants";

function ManageProfile() {
  const [image, setImage] = useState(gallery);
  const { user, authLoading, _id, setAlert, setUser } = useContext(Context);
  const [loading, setLoading] = useState(false);
  const [textField, setTextField] = useState({
    companyName: user != null ? user.companyName : "",
    pocName: user != null ? user.pocName : "",
    email: user != null ? user.email : "",
    phone: user != null ? user.phone : "",
    gstin: user != null ? user.gstin : "",
    website: user != null ? user.website : "",
    address: user != null ? user.address : "",
    bio: user != null ? user.bio : "",
  });

  const handleClick = () => {
    document.getElementById("imageInput").click();
  };

  const handleImageChange = (event) => {
    setImage(URL.createObjectURL(event.target.files[0]));
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
    formData.append("bio", _id("bio").value);

    const response = await dbObject.post("/users/update-profile.php", formData);

    // console.log(response);
    if (!response.data.error) {
      setUser(response.data.response);
    }
    setAlert({
      content: response.data.message,
      isDanger: response.data.error,
    });
    setLoading(false);
  };

  return (
    <>
      {authLoading || user == null ? (
        <AuthLoading />
      ) : (
        <div>
          <Sidebar activeTab={3} />
          <MainContent loading={loading}>
            <div>
              <h1 className="md:mx-[60px] mx-[20px] mb-2 text-3xl font-semibold leading-none tracking-tight text-gray-900 md:text-3xl light:text-white">
                Manage Profile
              </h1>
              <input
                id="imageInput"
                className="hidden"
                type="file"
                onChange={handleImageChange}
              />
              <button
                onClick={handleClick}
                className="md:mx-[60px] mx-[20px] mt-10 bg-gray-100 h-[100px] w-[100px] rounded-lg"
              >
                {image && (
                  <img
                    id="imagePreview"
                    src={user.image}
                    alt=""
                    className="h-full object-cover"
                  />
                )}
              </button>
              <div>
                <button
                  onClick={handleClick}
                  className="md:mx-[60px] mx-[20px] mt-2 font-semibold rounded-xl text-sm text-blue-700 "
                >
                  Upload Image
                </button>
              </div>

              <div className="md:mx-[60px] mx-[20px] mt-[40px]">
                <form>
                  <div className="grid md:grid-cols-2 md:gap-6">
                    <div className="relative z-0 w-full mb-6 group">
                      <input
                        type="text"
                        name="companyName"
                        id="companyName"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none light:text-white light:border-gray-600 light:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                        required
                        value={textField.companyName}
                        onChange={(e) => {
                          handleInputChange(e);
                        }}
                      />
                      <label
                        htmlFor="companyName"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 light:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:light:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >
                        Company name
                      </label>
                    </div>
                    <div className="relative z-0 w-full mb-6 group">
                      <input
                        type="text"
                        name="pocName"
                        id="pocName"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none light:text-white light:border-gray-600 light:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                        required
                        value={textField.pocName}
                        onChange={(e) => {
                          handleInputChange(e);
                        }}
                      />
                      <label
                        htmlFor="pocName"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 light:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:light:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >
                        Contact person's name
                      </label>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 md:gap-6">
                    <div className="relative z-0 w-full mb-6 group">
                      <input
                        type="email"
                        name="email"
                        id="email"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none light:text-white light:border-gray-600 light:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                        required
                        value={textField.email}
                        onChange={(e) => {
                          handleInputChange(e);
                        }}
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
                        type="phone"
                        name="phone"
                        id="phone"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none light:text-white light:border-gray-600 light:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                        required
                        readOnly
                        value={textField.phone}
                      />
                      <label
                        htmlFor="phone"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 light:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:light:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >
                        Phone
                      </label>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 md:gap-6">
                    <div className="relative z-0 w-full mb-6 group">
                      <input
                        type="text"
                        name="gstin"
                        id="gstin"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none light:text-white light:border-gray-600 light:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                        required
                        readOnly
                        value={textField.gstin}
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
                        type="text"
                        name="website"
                        id="website"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none light:text-white light:border-gray-600 light:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                        required
                        onChange={(e) => {
                          handleInputChange(e);
                        }}
                        value={textField.website}
                      />
                      <label
                        htmlFor="website"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 light:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:light:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >
                        Company Website
                      </label>
                    </div>
                  </div>
                  <div className="relative z-0 w-full mb-6 group">
                    <textarea
                      type="text"
                      name="address"
                      id="address"
                      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none light:text-white light:border-gray-600 light:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder=" "
                      required
                      onChange={(e) => {
                        handleInputChange(e);
                      }}
                      value={textField.address}
                    ></textarea>
                    <label
                      htmlFor="address"
                      className="peer-focus:font-medium absolute text-sm text-gray-500 light:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:light:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                      Company Address
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
                      onChange={(e) => {
                        handleInputChange(e);
                      }}
                      value={textField.bio}
                    ></textarea>
                    <label
                      htmlFor="bio"
                      className="peer-focus:font-medium absolute text-sm text-gray-500 light:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:light:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                      Bio
                    </label>
                  </div>
                  <button
                    onClick={() => {
                      console.log(textField);
                      updateProfile();
                    }}
                    type="button"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center light:bg-blue-600 light:hover:bg-blue-700 light:focus:ring-blue-800"
                  >
                    Update
                  </button>
                </form>
              </div>
            </div>
          </MainContent>
        </div>
      )}
    </>
  );
}

export default ManageProfile;
