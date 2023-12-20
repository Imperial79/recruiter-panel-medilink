import React, { useContext, useEffect, useState } from "react";
import logo from "../assets/logo.jpg";
import dashboard from "../assets/dashboard.svg";
import addVacancy from "../assets/add-vacancy.svg";
import manageVacancies from "../assets/manage-vacancies.svg";
import profile from "../assets/profile.svg";
import logoutIco from "../assets/logout.svg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { dbObject } from "../Helper/Constants";
import { Context } from "./ContextProvider";

function Sidebar(props) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { setUser } = useContext(Context);
  const navigator = useNavigate();

  const toggleSidebar = (e) => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    const closeSidebarOnClickOutside = (e) => {
      if (isSidebarOpen && e.target.closest("#logo-sidebar") === null) {
        setIsSidebarOpen(!isSidebarOpen);
      }
    };

    document.addEventListener("mousedown", closeSidebarOnClickOutside);

    return () => {
      document.removeEventListener("mousedown", closeSidebarOnClickOutside);
    };
  }, [isSidebarOpen]);

  const logout = async () => {
    const response = await dbObject.post("/users/logout.php");
    if (!response.data["error"]) {
      setUser(null);
      navigator("/");
    }
  };
  return (
    <div>
      <button
        onClick={toggleSidebar}
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
        className={`${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } border-gray-100 fixed top-0 left-0 z-40 w-64 h-screen pt-5 transition-transform bg-white sm:translate-x-0 light:bg-gray-800 light:border-gray-700`}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 pb-4 overflow-y-auto bg-white light:bg-gray-800">
          <img src={logo} alt="" className="w-[150px] mx-auto" />
          <ul className="space-y-2 font-medium mt-[20px]">
            <SidebarBtn
              to="/dashboard"
              index={0}
              activeTab={props.activeTab}
              label="Dashboard"
            />

            <SidebarBtn
              to="/post-vacancy"
              index={1}
              activeTab={props.activeTab}
              label="Post Vacancy"
            />

            <SidebarBtn
              to="/manage-vacancy"
              index={2}
              activeTab={props.activeTab}
              label="Manage Vacancy"
            />

            <SidebarBtn
              to="/manage-profile"
              index={3}
              activeTab={props.activeTab}
              label="Manage Profile"
            />

            <hr />
            <li className="w-full">
              <button
                onClick={logout}
                className="inline-flex items-center w-full px-4 py-2 my-2 text-sm transition duration-300 ease-in-out transform rounded-lg bg-red-500 hover:bg-red-400 text-white"
              >
                <img src={logoutIco} alt="" className="h-7 w-7" />
                <span className="ml-4">Log Out</span>
              </button>
            </li>
          </ul>
        </div>
      </aside>
    </div>
  );
}

export default Sidebar;

function SidebarBtn(props) {
  let isActive = props.activeTab === props.index;
  return (
    <Link to={props.to}>
      <li>
        <div
          className={`group inline-flex items-center w-full px-4 py-[8px] my-2 text-sm transition duration-300 ease-in-out transform rounded-lg focus:shadow-outline  ${
            isActive
              ? "font-semibold text-blue-700"
              : "hover:bg-gray-100 hover:text-gray-900"
          }`}
        >
          <div
            className={`${
              isActive
                ? "-translate-x-0 opacity-100"
                : "translate-x-full opacity-0"
            } h-6 w-1 rounded-full bg-blue-700 mr-1 transition-all ease-in-out duration-200`}
          ></div>
          <span className="ml-2">{props.label}</span>
        </div>
      </li>
    </Link>
  );
}
