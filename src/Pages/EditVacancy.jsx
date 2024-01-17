import React, { useContext, useEffect, useState } from "react";
import MainContent from "../Components/MainContent";
import Sidebar from "../Components/Sidebar";
import { Context } from "../Components/ContextProvider";
import { dbObject, experienceList } from "../Helper/Constants";
import FullScreenLoading from "../Components/FullScreenLoading";
import { useLocation } from "react-router-dom";
import {
  KDropDown,
  KFilePicker,
  KGrid,
  KTextArea,
  KTextField,
} from "../Components/components";

function EditVacancy() {
  const { user, _id, showAlert } = useContext(Context);
  const [loading, setLoading] = useState(false);
  const [textField, settextField] = useState({
    role: "",
    subRole: "",
    experience: "Fresher",
    salary: "",
    opening: "",
    requirements: "",
    specialRemark: "",
    ppoc: "",
    tags: "",
  });

  const [vacancyData, setvacancyData] = useState([]);

  const location = useLocation();
  const UrlParams = new URLSearchParams(location.search);
  const vacancyId = UrlParams.get("id");

  const fetchVacancyData = async () => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("vacancyId", vacancyId);
      const response = await dbObject.post(
        "/vacancy/vacancy-details.php",
        formData
      );
      if (!response.data.error) {
        setvacancyData(response.data.response);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  async function updateVacancyData() {
    try {
      setLoading(true);
      const formData = new FormData();

      formData.append("vacancyId", vacancyId);
      formData.append("experience", textField.experience);
      formData.append("salary", textField.salary);
      formData.append("opening", textField.opening);
      formData.append("requirements", textField.requirements);
      formData.append("specialRemark", textField.specialRemark);
      formData.append("ppoc", textField.ppoc);
      formData.append("tags", textField.tags);

      if (_id("attachment").files.length > 0) {
        formData.append("mediaFile", _id("attachment").files[0]);
      }

      const response = await dbObject.post(
        "/vacancy/edit-vacancy.php",
        formData
      );
      showAlert(response.data.message, response.data.error);

      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  }

  const handleInputChange = (e) => {
    settextField({
      ...textField, // Preserve existing values
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    fetchVacancyData();
  }, []);

  useEffect(() => {
    settextField({
      role: vacancyData?.roleTitle ?? "",
      subRole: vacancyData?.subRole ?? "",
      experience: vacancyData?.experience ?? "",
      salary: vacancyData?.salary ?? "",
      opening: vacancyData?.opening ?? "",
      requirements: vacancyData?.requirements ?? "",
      specialRemark: vacancyData?.specialRemark ?? "",
      ppoc: vacancyData?.ppoc ?? "",
      tags: vacancyData?.tags ?? "",
    });
  }, [vacancyData]);

  return (
    <FullScreenLoading isLoading={loading}>
      <Sidebar activeTab={-1} />

      <MainContent>
        <h1 className="md:mx-[60px] mx-[20px] mb-2 text-lg font-semibold leading-none tracking-tight text-gray-900 md:text-3xl light:text-white">
          Edit Vacancy
        </h1>
        <CompanyCard data={user ?? {}} />
        <form
          id="edit-vacancy-form"
          onSubmit={(e) => {
            e.preventDefault();
            updateVacancyData();
          }}
        >
          <div className="md:mx-[60px] mx-[20px] mt-[40px]">
            <KGrid crossAxisCount={3} gap={5}>
              <KTextField
                id="role"
                name="role"
                label="Role"
                placeholder="Role"
                value={textField?.role}
                readOnly={true}
              />
              <KTextField
                id="subRole"
                name="subRole"
                label="Sub-Role"
                placeholder="Sub-Role"
                value={textField?.subRole}
                readOnly={true}
              />

              <KDropDown
                id="experience"
                name="experience"
                label="Select Experience"
                value={textField.experience}
                onChange={(e) => {
                  handleInputChange(e);
                }}
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
                value={textField?.salary}
                onChange={(e) => {
                  handleInputChange(e);
                }}
              />
              <KTextField
                id="opening"
                name="opening"
                label="Opening"
                placeholder="Opening"
                value={textField?.opening}
                onChange={(e) => {
                  handleInputChange(e);
                }}
              />
              <KFilePicker
                label="Choose attachment"
                name="attachment"
                id="attachment"
                onChange={() => {
                  console.log(_id("attachment").files[0]);
                }}
              />
            </KGrid>

            <KGrid crossAxisCount={2} gap={5}>
              <KTextArea
                label="Requirements"
                id="requirements"
                name="requirements"
                rows={5}
                placeholder="Job requirements ..."
                value={textField?.requirements}
                onChange={(e) => {
                  handleInputChange(e);
                }}
              />
              <KTextArea
                label="Special Remarks"
                id="specialRemark"
                name="specialRemark"
                rows={5}
                placeholder="Special Remarks ..."
                value={textField?.specialRemark}
                onChange={(e) => {
                  handleInputChange(e);
                }}
              />
            </KGrid>

            <KGrid crossAxisCount={2} gap={5}>
              <KTextArea
                label="Preferred Point of Contact"
                id="ppoc"
                name="ppoc"
                rows={5}
                placeholder="Point of Contact ..."
                value={textField?.ppoc}
                onChange={(e) => {
                  handleInputChange(e);
                }}
              />
              <KTextArea
                label="Tags"
                id="tags"
                name="tags"
                rows={5}
                placeholder="Tags..."
                value={textField?.tags}
                onChange={(e) => {
                  handleInputChange(e);
                }}
              />
            </KGrid>

            {/* Sixth Row */}

            <div className="flex justify-end">
              <button
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center light:bg-blue-600 light:hover:bg-blue-700 light:focus:ring-blue-800 mt-5"
              >
                Update Vacancy Data
              </button>
            </div>
          </div>
        </form>
      </MainContent>
    </FullScreenLoading>
  );
}

export default EditVacancy;

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
