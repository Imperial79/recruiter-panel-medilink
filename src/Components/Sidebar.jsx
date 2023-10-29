import React, { useState } from "react";
import logo from "../assets/logo.jpg";
import dashboard from "../assets/dashboard.svg";
import addVacancy from "../assets/add-vacancy.svg";
import manageVacancies from "../assets/manage-vacancies.svg";
import { Link, useLocation } from "react-router-dom";

function Sidebar(props) {
  // let [activeTab, setActiveTab] = useState(0);
  // const location = useLocation();
  // if (location.pathname === "/dashboard") {
  //   handleActiveTab(0);
  // } else if (location.pathname === "/post-vacancy") {
  //   handleActiveTab(1);
  // } else {
  //   handleActiveTab(2);
  // }

  // function handleActiveTab(index) {
  //   console.log(index);
  //   setActiveTab = index;
  // }

  return (
    <div>
      <button
        data-drawer-target="logo-sidebar"
        data-drawer-toggle="logo-sidebar"
        aria-controls="logo-sidebar"
        type="button"
        className="m-5 inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-gray-200 light:text-gray-400 dark:hover:bg-gray-300 light:focus:ring-gray-600"
      >
        <span className="sr-only">Open sidebar</span>
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          ></path>
        </svg>
      </button>
      <aside
        id="logo-sidebar"
        className="border-r-2 border-gray-100 fixed top-0 left-0 z-40 w-64 h-screen pt-5 transition-transform -translate-x-full bg-white sm:translate-x-0 light:bg-gray-800 light:border-gray-700"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 pb-4 overflow-y-auto bg-white light:bg-gray-800">
          <img src={logo} alt="" className="w-[150px] mx-auto" />
          <ul className="space-y-2 font-medium mt-[20px]">
            <Link to="/dashboard">
              <li>
                <div
                  className={`inline-flex items-center w-full px-4 py-2 mt-1 text-sm transition duration-300 ease-in-out transform rounded-lg focus:shadow-outline hover:bg-teal-100 hover:text-gray-900 ${
                    props.activeTab == 0
                      ? "bg-teal-300 border border-teal-700"
                      : ""
                  }`}
                >
                  <img src={dashboard} alt="" className="h-7 w-7" />
                  <span className="ml-4">Dashboard</span>
                </div>
              </li>
            </Link>

            <Link to="/post-vacancy">
              <li>
                <div
                  className={`inline-flex items-center w-full px-4 py-2 mt-1 text-sm transition duration-300 ease-in-out transform rounded-lg focus:shadow-outline hover:bg-teal-100 hover:text-gray-900 ${
                    props.activeTab == 1
                      ? "bg-teal-300 border border-teal-700"
                      : ""
                  }`}
                >
                  <img src={addVacancy} alt="" className="h-7 w-7" />
                  <span className="ml-4">Post Vacancy</span>
                </div>
              </li>
            </Link>

            <Link to="/manage-vacancy">
              <li>
                <div
                  className={`inline-flex items-center w-full px-4 py-2 mt-1 text-sm transition duration-300 ease-in-out transform rounded-lg focus:shadow-outline hover:bg-teal-100 hover:text-gray-900 ${
                    props.activeTab == 2
                      ? "bg-teal-300 border border-teal-700"
                      : ""
                  }`}
                >
                  <img src={manageVacancies} alt="" className="h-7 w-7" />
                  <span className="ml-4">Manage Vacancy</span>
                </div>
              </li>
            </Link>
          </ul>
        </div>
      </aside>
    </div>
  );
}

export default Sidebar;
