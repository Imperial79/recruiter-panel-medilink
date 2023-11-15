import React, { useContext, useEffect, useState } from "react";
import Sidebar from "../Components/Sidebar";
import MainContent from "../Components/MainContent";
import { Context } from "../Components/ContextProvider";
import AuthLoading from "../Components/AuthLoading";
import { dbObject } from "../Helper/Constants";

function ManageVacancy() {
  const { user, authLoading, _id } = useContext(Context);
  const [loading, setLoading] = useState(false);
  const [showDrop, setShowDrop] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("Active");
  const [pageNo, setPageNo] = useState("0");
  const [totalRecords, setTotalRecords] = useState("0");
  const [dataList, setDataList] = useState([]);
  const [searchKey, setSearchKey] = useState("");

  const toggleDrop = () => {
    setShowDrop(!showDrop);
  };

  const setStatusBtn = (status) => {
    setSelectedStatus(status);
    toggleDrop();
  };

  const fetchVacancies = async () => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("status", selectedStatus);
      formData.append("pageNo", pageNo);
      formData.append("searchKey", searchKey);
      const response = await dbObject.post(
        "/vacancy/list-vacancy.php",
        formData
      );
      if (!response.data.error) {
        setDataList(response.data.response.dataList);
        setTotalRecords(response.data.response.totalRecords);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchVacancies();
  }, [selectedStatus, pageNo]);

  return (
    <>
      {authLoading ? (
        <AuthLoading />
      ) : (
        <div>
          <Sidebar activeTab={2} />
          <MainContent loading={loading}>
            <h1 className="md:mx-[60px] mx-[20px] mb-2 text-lg font-semibold leading-none tracking-tight text-gray-900 md:text-3xl light:text-white">
              Manage Vacancy
            </h1>

            <div className="md:px-[60px] px-[20px] mt-10">
              <div className="relative overflow-x-auto sm:rounded-lg">
                <div className="p-2 flex items-center justify-between flex-column flex-wrap md:flex-row pb-4 bg-white light:bg-gray-900">
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
                        <div
                          className={`h-2.5 w-2.5 rounded-full me-2 ${
                            selectedStatus == "Active"
                              ? "bg-green-500"
                              : selectedStatus == "Expired"
                              ? "bg-red-500"
                              : "bg-yellow-600"
                          }`}
                        ></div>{" "}
                        {selectedStatus}
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
                      className={`z-30 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 light:bg-gray-700 light:divide-gray-600 ${
                        showDrop ? "absolute" : "hidden"
                      }`}
                    >
                      <ul
                        className="py-1 text-sm text-gray-700 light:text-gray-200"
                        aria-labelledby="dropdownActionButton"
                      >
                        <li>
                          <button
                            onClick={() => {
                              setStatusBtn("Active");
                            }}
                            className="inline-flex items-center w-full px-4 py-2 hover:bg-gray-100 light:hover:bg-gray-600 light:hover:text-white"
                          >
                            <div className="h-2.5 w-2.5 rounded-full bg-green-500 me-2"></div>
                            Active
                          </button>
                        </li>
                        <li>
                          <button
                            onClick={() => {
                              setStatusBtn("Expired");
                            }}
                            className="inline-flex items-center w-full px-4 py-2 hover:bg-gray-100 light:hover:bg-gray-600 light:hover:text-white"
                          >
                            <div className="h-2.5 w-2.5 rounded-full bg-red-500 me-2"></div>
                            Expired
                          </button>
                        </li>
                        <li>
                          <button
                            onClick={() => {
                              setStatusBtn("Cancelled");
                            }}
                            className="inline-flex items-center w-full px-4 py-2 hover:bg-gray-100 light:hover:bg-gray-600 light:hover:text-white"
                          >
                            <div className="h-2.5 w-2.5 rounded-full bg-yellow-500 me-2"></div>
                            Cancelled
                          </button>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <label htmlFor="searchKey" className="sr-only">
                    Search
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                      <svg
                        className="w-4 h-4 text-gray-500 light:text-gray-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 20"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                        />
                      </svg>
                    </div>
                    <input
                      type="text"
                      id="searchKey"
                      onChange={(e) => {
                        setSearchKey(e.target.value);
                      }}
                      onKeyDown={(event) => {
                        if (event.key === "Enter") {
                          fetchVacancies();
                        }
                      }}
                      className="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 light:bg-gray-700 light:border-gray-600 light:placeholder-gray-400 light:text-white light:focus:ring-blue-500 light:focus:border-blue-500"
                      placeholder="Search for vacancies"
                    />
                  </div>
                </div>
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 light:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-start">
                        Profile
                      </th>
                      <th scope="col" className="px-6 py-3 text-center">
                        Amount/Term
                      </th>
                      <th scope="col" className="px-6 py-3 text-center">
                        Timeline
                      </th>
                      <th scope="col" className="px-6 py-3 text-center">
                        Status
                      </th>
                      <th scope="col" className="px-6 py-3 text-end">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {dataList.map((data, index) => (
                      <tr
                        key={index}
                        className="bg-white border-b light:bg-gray-800 light:border-gray-700 hover:bg-gray-50 light:hover:bg-gray-600"
                      >
                        <TableData data={data} />
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
                  of{" "}
                  <span className="font-semibold text-gray-900 light:text-white">
                    {totalRecords}
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
        </div>
      )}
    </>
  );
}

export default ManageVacancy;

function TableData({ data }) {
  return (
    <>
      <th
        scope="row"
        className="px-6 py-4 text-gray-900 whitespace-nowrap light:text-white"
      >
        <div className="text-start">
          <div className="text-base font-semibold">{data.position}</div>
          <div className="font-normal text-gray-500">{data.salary}</div>
          <div className="font-normal text-gray-500">{data.experience}</div>
        </div>
      </th>
      <td
        scope="row"
        className="px-6 py-4 text-gray-900 whitespace-nowrap light:text-white"
      >
        <div className="text-center">
          <div className="text-sm font-medium">
            {"Term: " + data.term + " days"}
          </div>
          <div className="text-sm font-medium">{"Paid: ₹ " + data.amount}</div>
        </div>
      </td>
      <td
        scope="row"
        className="px-6 py-4 text-gray-900 whitespace-nowrap light:text-white"
      >
        <div className="text-center">
          <div className="text-sm font-semibold text-green-600">
            {data.postDate}
          </div>
          <div className="text-sm font-normal text-red-600">
            {data.expireDate}
          </div>
        </div>
      </td>
      <td className="px-6 py-4">
        <div className="flex items-center justify-center">
          <div
            className={`h-2.5 w-2.5 rounded-full me-2 ${
              data.status == "Active"
                ? "bg-green-500"
                : data.status == "Expired"
                ? "bg-red-500"
                : "bg-yellow-600"
            }`}
          ></div>{" "}
          {data.status}
        </div>
      </td>
      <td className="px-6 py-4 text-end">
        <a
          href="#"
          className="font-medium text-blue-600 light:text-blue-500 hover:underline"
        >
          Edit
        </a>
      </td>
    </>
  );
}
