import React, { useEffect, useState } from "react";
import Sidebar from "../Components/Sidebar";
import { Link } from "react-router-dom";
import ContentCard from "../Components/ContentCard";
import BarChart from "../Components/BarChart";
import { UserData } from "../Components/Data";
import MainContent from "../Components/MainContent";

function DashboardPage() {
  const [userData, setUserData] = useState({
    labels: UserData.map((data) => data.year),
    datasets: [
      {
        label: "Users Gained",
        data: UserData.map((data) => data.userGain),
      },
    ],
  });

  return (
    <div>
      <Sidebar activeTab={0} />

      <MainContent>
        <h1 className="px-4 mb-2 text-3xl font-semibold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-4xl light:text-white">
          Hello,{" "}
          <span className="text-blue-600 light:text-blue-500">Vivek Verma</span>
        </h1>

        <p className="px-4 text-lg font-semibold lg:text-xl text-gray-900">
          {new Date().toDateString()}
        </p>

        <ContentCard>
          <div className="grid md:grid-cols-4 grid-cols-2 gap-4 mb-4">
            <StatsCard label="Total Applicants" content="100" />
            <StatsCard label="Total Applicants" content="100" />
            <StatsCard label="Total Applicants" content="100" />
            <StatsCard label="Total Applicants" content="100" />
          </div>
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            {/* <ElementCard>
              <div>
                <p className="text-base font-normal text-gray-500 light:text-gray-400">
                  Applicants data of 7 Days
                </p>
                <div className="leading-none text-sm font-medium text-gray-900 light:text-white space-y-2 mt-2">
                  <h1>Applied Jobs: 10</h1>
                  <h1>Placed Jobs: 20</h1>
                </div>
              </div>
              <BarChart chartData={userData} />
            </ElementCard> */}

            <ElementCard>
              <div className="flex justify-between items-center mb-3">
                <p className="font-medium text-[17px] text-black">
                  Recent Vacancies
                </p>
                <a
                  href="add-user.php"
                  className="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 light:focus:ring-gray-700 light:bg-gray-800 light:text-gray-400 light:border-gray-600 light:hover:text-white light:hover:bg-gray-700"
                >
                  Post Vacancy
                </a>
              </div>

              <div className="relative overflow-x-auto md:rounded-lg">
                <table className="w-full text-sm text-left text-gray-500 light:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 light:bg-gray-700 light:text-gray-400 text-center">
                    <tr>
                      <th scope="col" className="px-6 py-3">
                        #
                      </th>
                      <th scope="col" className="px-6 py-3">
                        position
                      </th>
                      <th scope="col" className="px-6 py-3">
                        salary
                      </th>
                      <th scope="col" className="px-6 py-3">
                        expires in
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <TableRow />
                    <TableRow />
                    <TableRow />
                    <TableRow />
                  </tbody>
                </table>
              </div>
            </ElementCard>
          </div>
        </ContentCard>
      </MainContent>
    </div>
  );
}

export default DashboardPage;

function TableRow(props) {
  return (
    <tr className="bg-white border-b light:bg-gray-900 light:border-gray-700 text-center">
      <th
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap light:text-white"
      >
        1234
      </th>
      <td className="px-6 py-4">Avishek Verma</td>

      <td className="px-6 py-4">BCA</td>
      <td className="px-6 py-4">
        <h1 className="font-medium text-blue-600 light:text-blue-500">
          2 Days
        </h1>
      </td>
    </tr>
  );
}

function ElementCard(props) {
  return (
    <div className="w-auto bg-white rounded-[20px] drop-shadow-md light:bg-gray-800 p-4 md:p-6">
      {props.children}
    </div>
  );
}

function StatsCard(props) {
  return (
    <Link
      to=""
      className="items-center justify-center h-30 rounded-[26px] shadow-2xl hover:shadow-lg duration-150 transition-all shadow-gray-300 bg-white text-white light:bg-gray-800 p-5"
    >
      <div className="flex items-center justify-between">
        <h5 className="mb-2 text-2xl font-semibold tracking-tight text-black">
          {props.content}
        </h5>
        <div className="flex items-center justify-center rounded-full bg-blue-100 h-12 w-12 p-5">
          <img src="" alt="" />
        </div>
      </div>
      <p className="mb-3 font-medium text-[17px] text-black">{props.label}</p>
    </Link>
  );
}
