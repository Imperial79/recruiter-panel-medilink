import { useContext, useEffect, useState } from "react";
import Sidebar from "../Components/Sidebar";
import { Link } from "react-router-dom";
import ContentCard from "../Components/ContentCard";
import MainContent from "../Components/MainContent";
import LineCh from "../Components/LineCh";
import { Context } from "../Components/ContextProvider";
import AuthLoading from "../Components/AuthLoading";
import { dbObject } from "../Helper/Constants";
import FullScreenLoading from "../Components/FullScreenLoading";

function DashboardPage() {
  const { user, authLoading } = useContext(Context);
  const [loading, setLoading] = useState(false);
  const [dataList, setDataList] = useState([]);

  const fetchVacancies = async () => {
    try {
      setLoading(true);
      const response = await dbObject.get("/vacancy/recent-vacancy-list.php");
      if (!response.data.error) {
        setDataList(response.data.response);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVacancies();
  }, []);
  return (
    <>
      {authLoading ? (
        <AuthLoading />
      ) : (
        <FullScreenLoading isLoading={loading}>
          <Sidebar activeTab={0} />
          <MainContent>
            <div>
              <div className="m-5">
                <h3 className="mb-2 text-xl font-semibold tracking-tight text-gray-900 md:text-2xl">
                  Hello,{" "}
                  <span className="text-blue-600 light:text-blue-500">
                    {user.companyName}
                  </span>
                </h3>
                <p className="text-sm font-semibold md:text-md text-gray-900">
                  {new Date().toDateString()}
                </p>
              </div>

              <ContentCard>
                <ElementCard>
                  <LineCh />
                </ElementCard>
                <div className="grid md:grid-cols-2 md:gap-4 gap-0 mb-4">
                  <ElementCard>
                    <div className="flex justify-between items-center mb-3">
                      <p className="font-medium text-[15px] text-black">
                        Recent Vacancies
                      </p>
                      <Link
                        to="/post-vacancy"
                        className="py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 light:focus:ring-gray-700 light:bg-gray-800 light:text-gray-400 light:border-gray-600 light:hover:text-white light:hover:bg-gray-700"
                      >
                        Post Vacancy
                      </Link>
                    </div>
                    <div className="relative overflow-x-auto md:rounded-lg">
                      <table className="w-full text-sm text-left text-gray-500 light:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-200 light:bg-gray-700 light:text-gray-400 text-center">
                          <tr>
                            <th scope="col" className="px-6 py-3 text-start">
                              Role
                            </th>
                            <th scope="col" className="px-6 py-3 text-center">
                              Profile
                            </th>
                            <th scope="col" className="px-6 py-3 text-center">
                              Expires On
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
                  </ElementCard>

                  <ElementCard>
                    <p className="font-medium text-[15px] text-black mb-5 pt-4">
                      Quick Links
                    </p>

                    <ul className="text-blue-600 cursor-pointer">
                      <div className="md:grid md:grid-cols-2 gap-4">
                        <li className="mb-5 bg-gray-100 p-5 text-center rounded-xl hover:bg-gray-300">
                          Website
                        </li>
                        <li className="mb-5 bg-gray-100 p-5 text-center rounded-xl hover:bg-gray-300">
                          Change Password
                        </li>
                      </div>
                      <div className="md:grid md:grid-cols-2 gap-4">
                        <li className="mb-5 bg-gray-100 p-5 text-center rounded-xl hover:bg-gray-300">
                          Privacy policy
                        </li>
                        <li className="mb-5 bg-gray-100 p-5 text-center rounded-xl hover:bg-gray-300">
                          Terms & Conditions
                        </li>
                      </div>
                    </ul>
                  </ElementCard>
                </div>
              </ContentCard>
            </div>
          </MainContent>
        </FullScreenLoading>
      )}
    </>
  );
}

export default DashboardPage;

function TableData({ data }) {
  return (
    <>
      <th
        scope="row"
        className="px-6 py-4 text-gray-900 whitespace-nowrap light:text-white"
      >
        <div className="text-start">
          <div className="text-base font-semibold">{data.roleTitle}</div>
          <div className="font-normal text-gray-500">{data.subRole}</div>
        </div>
      </th>
      <td
        scope="row"
        className="px-6 py-4 text-gray-900 whitespace-nowrap light:text-white text-center"
      >
        <div className="font-normal text-gray-500">Salary: {data.salary}</div>
        <div className="font-normal text-gray-500">Exp: {data.experience}</div>
        <div className="font-normal text-gray-500">Opening: {data.opening}</div>
      </td>
      <td
        scope="row"
        className="px-6 py-4 text-gray-900 whitespace-nowrap light:text-white"
      >
        <div className="text-center">
          <div className="text-sm font-medium text-red-600">
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

function ElementCard({ children }) {
  return (
    <div className="mb-5 overflow-x-auto items-center justify-center rounded-[26px] shadow-2xl hover:shadow-lg duration-150 transition-all shadow-gray-300 bg-white text-black light:bg-gray-800 md:p-5 p-3">
      {children}
    </div>
  );
}

function StatsCard(props) {
  return (
    <Link
      to=""
      className="items-center justify-center rounded-[26px] shadow-2xl hover:shadow-lg duration-150 transition-all shadow-gray-300 bg-white text-white light:bg-gray-800 md:p-5 p-3"
    >
      <div className="flex items-center justify-between">
        <h5 className="md:text-2xl text-lg font-semibold tracking-tight text-black">
          {props.content}
        </h5>
        <div className="flex items-center justify-center rounded-full bg-blue-100 h-12 w-12 p-5">
          <img src="" alt="" />
        </div>
      </div>
      <p className="mb-3 mt-5 font-medium md:text-[17px] text-[13px] text-black">
        {props.label}
      </p>
    </Link>
  );
}
