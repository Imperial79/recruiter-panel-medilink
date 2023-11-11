import React, { useContext, useState } from "react";
import Sidebar from "../Components/Sidebar";
import MainContent from "../Components/MainContent";
import { Context } from "../Components/ContextProvider";
import AuthLoading from "../Components/AuthLoading";

function ManageVacancy() {
  const { user, authLoading } = useContext(Context);
  const [loading, setLoading] = useState(false);
  const [showDrop, setShowDrop] = useState(false);

  const toggleDrop = () => {
    setShowDrop(!showDrop);
  };

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
              <div class="relative overflow-x-auto sm:rounded-lg">
                <div class="flex items-center justify-between flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 pb-4 bg-white light:bg-gray-900">
                  <div>
                    <button
                      id="dropdownActionButton"
                      onClick={toggleDrop}
                      data-dropdown-toggle="dropdownAction"
                      class="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-3 py-1.5 light:bg-gray-800 light:text-gray-400 light:border-gray-600 light:hover:bg-gray-700 light:hover:border-gray-600 light:focus:ring-gray-700"
                      type="button"
                    >
                      <span class="sr-only">Action button</span>
                      Action
                      <svg
                        class="w-2.5 h-2.5 ms-2.5"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 10 6"
                      >
                        <path
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="m1 1 4 4 4-4"
                        />
                      </svg>
                    </button>
                    <div
                      id="dropdownAction"
                      class={`z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 light:bg-gray-700 light:divide-gray-600 ${
                        showDrop ? "absolute" : "hidden"
                      }`}
                    >
                      <ul
                        class="py-1 text-sm text-gray-700 light:text-gray-200"
                        aria-labelledby="dropdownActionButton"
                      >
                        <li>
                          <a
                            href="#"
                            class="block px-4 py-2 hover:bg-gray-100 light:hover:bg-gray-600 light:hover:text-white"
                          >
                            Reward
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            class="block px-4 py-2 hover:bg-gray-100 light:hover:bg-gray-600 light:hover:text-white"
                          >
                            Promote
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            class="block px-4 py-2 hover:bg-gray-100 light:hover:bg-gray-600 light:hover:text-white"
                          >
                            Activate account
                          </a>
                        </li>
                      </ul>
                      <div class="py-1">
                        <a
                          href="#"
                          class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 light:hover:bg-gray-600 light:text-gray-200 light:hover:text-white"
                        >
                          Delete User
                        </a>
                      </div>
                    </div>
                  </div>
                  <label for="table-search" class="sr-only">
                    Search
                  </label>
                  <div class="relative">
                    <div class="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                      <svg
                        class="w-4 h-4 text-gray-500 light:text-gray-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 20"
                      >
                        <path
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                        />
                      </svg>
                    </div>
                    <input
                      type="text"
                      id="table-search-users"
                      class="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 light:bg-gray-700 light:border-gray-600 light:placeholder-gray-400 light:text-white light:focus:ring-blue-500 light:focus:border-blue-500"
                      placeholder="Search for users"
                    />
                  </div>
                </div>
                <table class="w-full text-sm text-left rtl:text-right text-gray-500 light:text-gray-400">
                  <thead class="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                      <th scope="col" class="px-6 py-3">
                        Name
                      </th>
                      <th scope="col" class="px-6 py-3">
                        Position
                      </th>
                      <th scope="col" class="px-6 py-3">
                        Status
                      </th>
                      <th scope="col" class="px-6 py-3">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <TableData />
                    <TableData />
                    <TableData />
                    <TableData />
                  </tbody>
                </table>
              </div>
            </div>
          </MainContent>
        </div>
      )}
    </>
  );
}

export default ManageVacancy;

function TableData() {
  return (
    <tr class="bg-white border-b light:bg-gray-800 light:border-gray-700 hover:bg-gray-50 light:hover:bg-gray-600">
      <th
        scope="row"
        class="px-6 py-4 text-gray-900 whitespace-nowrap light:text-white"
      >
        <div class="">
          <div class="text-base font-semibold">Neil Sims</div>
          <div class="font-normal text-gray-500">neil.sims@flowbite.com</div>
        </div>
      </th>
      <td class="px-6 py-4">React Developer</td>
      <td class="px-6 py-4">
        <div class="flex items-center">
          <div class="h-2.5 w-2.5 rounded-full bg-green-500 me-2"></div> Online
        </div>
      </td>
      <td class="px-6 py-4">
        <a
          href="#"
          class="font-medium text-blue-600 light:text-blue-500 hover:underline"
        >
          Edit user
        </a>
      </td>
    </tr>
  );
}
