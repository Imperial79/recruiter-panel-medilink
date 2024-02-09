import React, { useContext, useEffect, useState } from "react";
import logo from "../assets/logo.jpg";
import logoutIco from "../assets/logout.svg";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { dbObject } from "../Helper/Constants";
import { Context } from "./ContextProvider";

function Sidebar() {
  const { activeTab, setActiveTab } = useContext(Context);
  const [showSidebar, setshowSidebar] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { setUser } = useContext(Context);
  const navigator = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (
      location.pathname === "/" ||
      location.pathname === "/hirehelix-resume"
    ) {
      setshowSidebar(false);
    } else {
      setshowSidebar(true);
      if (location.pathname === "/dashboard") {
        setActiveTab(0);
      } else if (location.pathname === "/post-vacancy") {
        setActiveTab(1);
      } else if (location.pathname === "/manage-vacancy") {
        setActiveTab(2);
      } else if (location.pathname === "/manage-profile") {
        setActiveTab(3);
      } else {
        setActiveTab(4);
      }
    }
  }, [location]);

  const toggleSidebar = () => {
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
    <div className={`${showSidebar ? "" : "hidden"}`}>
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
        } border-gray-100 fixed top-0 left-0 z-40 w-64 h-screen pt-5 transition-transform sm:translate-x-0 bg-white drop-shadow-2xl md:drop-shadow-none`}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 pb-4 overflow-y-auto  light:bg-gray-800">
          <img src={logo} alt="" className="w-[150px] mx-auto" />
          <ul className="space-y-2 font-medium mt-10">
            <SidebarBtn
              to="/dashboard"
              index={0}
              activeTab={activeTab}
              label="Dashboard"
              onClick={() => {
                setActiveTab(0);
                setIsSidebarOpen(false);
              }}
            />

            <SidebarBtn
              to="/post-vacancy"
              index={1}
              activeTab={activeTab}
              label="Post Vacancy"
              onClick={() => {
                setActiveTab(1);
                setIsSidebarOpen(false);
              }}
            />

            <SidebarBtn
              to="/manage-vacancy"
              index={2}
              activeTab={activeTab}
              label="Manage Vacancy"
              onClick={() => {
                setActiveTab(2);
                setIsSidebarOpen(false);
              }}
            />

            <SidebarBtn
              to="/manage-profile"
              index={3}
              activeTab={activeTab}
              label="Manage Profile"
              onClick={() => {
                setActiveTab(3);
                setIsSidebarOpen(false);
              }}
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

function SidebarBtn({ to, label, activeTab, index, onClick }) {
  let isActive = activeTab === index;
  return (
    <Link to={to} onClick={onClick}>
      <li>
        <div
          className={`px-5 py-3 w-full mb-5 rounded-lg text-black transition-all border-l-8  ${
            isActive
              ? "bg-gray-100 border-gray-700"
              : "hover:bg-gray-600 hover:text-white border-white hover:border-gray-600"
          }`}
        >
          {label}
        </div>
      </li>
    </Link>
  );
}
