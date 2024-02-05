import React, { useContext, useEffect, useState } from "react";
import Sidebar from "../Components/Sidebar";
import MainContent from "../Components/MainContent";
import { Context } from "../Components/ContextProvider";
import AuthLoading from "../Components/AuthLoading";
import { dbObject } from "../Helper/Constants";
import FullScreenLoading from "../Components/FullScreenLoading";
import { Link, useLocation } from "react-router-dom";

function CandidateList() {
  const { user, authLoading, _id, showAlert } = useContext(Context);
  const [loading, setLoading] = useState(false);
  const [showDrop, setShowDrop] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("Choose Action");
  const [pageNo, setPageNo] = useState(0);
  const [dataList, setDataList] = useState([]);
  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);
  const vacancyId = urlParams.get("id");
  const roleTitle = urlParams.get("role");

  const [selectAll, setSelectAll] = useState(false);
  const [checkboxes, setCheckboxes] = useState({});

  const handleSelectAll = () => {
    // Update the state to toggle the selectAll value
    setSelectAll(!selectAll);

    // Update the state for each checkbox to match the selectAll value
    const updatedCheckboxes = {};
    for (const checkbox in checkboxes) {
      updatedCheckboxes[checkbox] = !selectAll;
    }
    setCheckboxes(updatedCheckboxes);
  };

  const handleCheckboxChange = (checkboxName) => {
    // Update the state for the specific checkbox
    setCheckboxes((prevCheckboxes) => ({
      ...prevCheckboxes,
      [checkboxName]: !prevCheckboxes[checkboxName],
    }));

    // Check if all checkboxes are selected and update selectAll accordingly
    const allChecked = Object.values(checkboxes).every((value) => value);
    setSelectAll(allChecked);
  };

  const toggleDrop = () => {
    setShowDrop(!showDrop);
  };

  const fetchVacancyData = async () => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("vacancyId", vacancyId);
      formData.append("pageNo", pageNo);
      const response = await dbObject.post(
        "/vacancy/applied-candidates.php",
        formData
      );

      if (!response.data.error) {
        setDataList(response.data.response);

        response.data.response.map((data, index) => {
          setCheckboxes((prevCheckboxes) => ({
            ...prevCheckboxes,
            [data.id]: false,
          }));
        });
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  async function candidateAction(action, idList) {
    if (idList.length <= 20) {
      try {
        setLoading(true);
        const formData = new FormData();
        formData.append("candidateIdList", JSON.stringify(idList));
        formData.append("action", action);
        formData.append("vacancyId", vacancyId);

        const response = await dbObject.post(
          "/vacancy/candidate-action.php",
          formData
        );
        showAlert(response.data.message, response.data.error);

        if (!response.data.error) {
          fetchVacancyData();
        }
        setLoading(false);
      } catch (error) {}
    } else {
      showAlert("Please select max 20 candidates at a time", true);
    }
  }

  function handleStatusSelection(status) {
    const entries = Object.entries(checkboxes);

    // Use filter to get IDs where the corresponding boolean value is true
    const trueIds = entries
      .filter(([id, value]) => value === true)
      .map(([id]) => id);

    candidateAction(status, trueIds);
  }

  useEffect(() => {
    fetchVacancyData();
  }, [pageNo]);

  return (
    <>
      {authLoading ? (
        <AuthLoading />
      ) : (
        <FullScreenLoading isLoading={loading}>
          <Sidebar activeTab={2} />
          <MainContent>
            <h1 className="md:mx-[60px] mx-[20px] mb-2 text-lg font-semibold leading-none tracking-tight text-gray-900 md:text-3xl light:text-white">
              Applied Candidates
              <p className="text-[16px] font-medium tracking-normal mt-1">
                Role: {roleTitle}
              </p>
            </h1>

            <div className="md:px-[60px] px-[20px] mt-10">
              <div className="relative overflow-x-auto sm:rounded-lg">
                <div className="p-2 flex items-center justify-between flex-column flex-wrap md:flex-row pb-4 bg-white light:bg-gray-900">
                  <KDropdown
                    value={selectedStatus}
                    setValue={setSelectedStatus}
                    dataList={[
                      { value: "Applied", color: "yellow-500" },
                      { value: "In-Review", color: "purple-500" },
                      { value: "Selected", color: "green-500" },
                      { value: "Rejected", color: "red-500" },
                    ]}
                    handleStatusSelection={handleStatusSelection}
                    isOpen={showDrop}
                    toggleDrop={toggleDrop}
                  />
                </div>
                <table className="mb-16 w-full text-sm text-left rtl:text-right text-gray-500 light:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                      <th scope="col" className="p-4">
                        <div className="flex items-center">
                          <input
                            id="selectAllCheck"
                            type="checkbox"
                            checked={selectAll}
                            onChange={handleSelectAll}
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                          />
                          <label htmlFor="selectAllCheck" className="sr-only">
                            checkbox
                          </label>
                        </div>
                      </th>
                      <th scope="col" className="px-6 py-3 text-start">
                        Fullname
                      </th>
                      <th scope="col" className="px-6 py-3 text-end">
                        Profile
                      </th>
                      <th scope="col" className="px-6 py-3 text-start">
                        Address
                      </th>
                      <th scope="col" className="px-6 py-3 text-start">
                        Applied
                      </th>
                      <th scope="col" className="px-6 py-3 text-end">
                        Resume
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {dataList.map((data, index) => (
                      <tr
                        key={index}
                        className="bg-white border-b light:bg-gray-800 light:border-gray-700 hover:bg-gray-50 light:hover:bg-gray-600"
                      >
                        <TableData
                          data={data}
                          checkboxes={checkboxes}
                          handleCheckboxChange={handleCheckboxChange}
                        />
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <nav
                className="flex items-center flex-column flex-wrap md:flex-row justify-between pt-4"
                aria-label="Table navigation"
              >
                <span className="text-sm font-normal text-gray-500 light:text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto">
                  Showing{" "}
                  <span className="font-semibold text-gray-900 light:text-white">
                    {dataList.length}
                  </span>{" "}
                  of Page{" "}
                  <span className="font-semibold text-gray-900 light:text-white">
                    {pageNo + 1}
                  </span>
                </span>
                <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
                  <li>
                    <button
                      onClick={() => {
                        if (pageNo > 0) {
                          setPageNo(pageNo - 1);
                        }
                      }}
                      className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700"
                    >
                      Previous
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => {
                        setPageNo(pageNo + 1);
                      }}
                      className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700"
                    >
                      Next
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          </MainContent>
        </FullScreenLoading>
      )}
    </>
  );
}

export default CandidateList;

function TableData({ data, handleCheckboxChange, checkboxes }) {
  return (
    <>
      <th scope="col" className="p-4">
        <div className="flex items-center">
          <input
            id={data.id}
            checked={checkboxes[data.id]}
            onChange={() => handleCheckboxChange(data.id)}
            type="checkbox"
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
          />
          <label htmlFor={data.id} className="sr-only">
            checkbox
          </label>
        </div>
      </th>
      <th
        scope="row"
        className="px-6 py-4 text-gray-900 whitespace-nowrap light:text-white"
      >
        <div className="text-start">
          <div className="text-base font-semibold">
            {data.firstName} {data.lastName}
          </div>
          <div className="text-[13px] font-normal text-gray-500">
            Ph: {data.phone}
          </div>
        </div>
      </th>
      <td
        scope="row"
        className="px-6 py-4 text-gray-900 whitespace-nowrap light:text-white text-end"
      >
        <div className="font-normal text-gray-500">Gender: {data.gender}</div>
        <div className="font-normal text-gray-500">Exp: {data.experience}</div>
      </td>
      <td
        scope="row"
        className="px-6 py-4 text-gray-900 whitespace-pre-wrap light:text-white"
      >
        <div className="text-sm font-normal">{data.address}</div>
        <div className="text-sm font-normal">
          {data.city}, {data.state}
        </div>
      </td>

      <td
        scope="row"
        className="px-6 py-4 text-gray-900 whitespace-nowrap light:text-white"
      >
        <div className="font-medium text-gray-500">Date: {data.date}</div>

        <div className="inline-flex items-center gap-1">
          Status:{" "}
          <span
            className={`font-medium text-${
              data.status === "Applied"
                ? "yellow-500"
                : data.status === "In-Review"
                ? "purple-500"
                : data.status === "Selected"
                ? "green-500"
                : "red-500"
            }`}
          >
            {data.status}
          </span>
        </div>
      </td>

      <td className="px-6 py-4 text-end space-x-2">
        {data.optedResumeBuilder == "true" ? (
          <Link
            to={"/hirehelix-resume?id=" + data.jobFinderId}
            target="_blank"
            className="font-medium text-blue-600 light:text-blue-500 hover:underline "
          >
            Hirehelix
          </Link>
        ) : (
          <Link
            to={data.resume}
            target="_blank"
            className="font-medium text-blue-600 light:text-blue-500 hover:underline "
          >
            Uploaded
          </Link>
        )}
      </td>
    </>
  );
}

function KDropdown({
  value,
  setValue,
  toggleDrop,
  isOpen,
  dataList,
  handleStatusSelection,
}) {
  return (
    <div>
      <button
        id="dropdownActionButton"
        onClick={toggleDrop}
        data-dropdown-toggle="dropdownAction"
        className="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-3 py-1.5 light:bg-gray-800 light:text-gray-400 light:border-gray-600 light:hover:bg-gray-700 light:hover:border-gray-600 light:focus:ring-gray-700"
        type="button"
      >
        <span className="sr-only">Action button</span>
        <div className="flex items-center justify-center">
          {value === "Choose Action" ? (
            <></>
          ) : (
            <div
              className={`h-2.5 w-2.5 rounded-full me-2 ${
                value == "Applied"
                  ? "bg-yellow-500"
                  : value == "In-Review"
                  ? "bg-purple-500"
                  : value == "Selected"
                  ? "bg-green-500"
                  : "bg-yellow-600"
              }`}
            ></div>
          )}
          {value}
        </div>
        <svg
          className="w-2.5 h-2.5 ms-2.5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 4 4 4-4"
          />
        </svg>
      </button>
      <div
        id="dropdownAction"
        className={`z-50 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 light:bg-gray-700 light:divide-gray-600 ${
          isOpen ? "absolute" : "hidden"
        }`}
      >
        <ul
          className="py-1 text-sm text-gray-700 light:text-gray-200"
          aria-labelledby="dropdownActionButton"
        >
          {dataList.map((data, index) => (
            <li key={index}>
              <button
                onClick={() => {
                  setValue(data.value);
                  handleStatusSelection(data.value);
                  toggleDrop();
                }}
                className="inline-flex items-center w-full px-4 py-2 hover:bg-gray-100 light:hover:bg-gray-600 light:hover:text-white"
              >
                <div
                  className={`h-2.5 w-2.5 rounded-full bg-${data.color} me-2`}
                ></div>
                {data.value}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
