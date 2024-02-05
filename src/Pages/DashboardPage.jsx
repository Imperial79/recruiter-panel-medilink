import { useContext, useEffect, useState } from "react";
import Sidebar from "../Components/Sidebar";
import { Link } from "react-router-dom";
import ContentCard from "../Components/ContentCard";
import MainContent from "../Components/MainContent";
import LineCh from "../Components/LineCh";
import { Context } from "../Components/ContextProvider";
import AuthLoading from "../Components/AuthLoading";
import { dbObject } from "../Helper/Constants";
import { KGrid } from "../Components/components";
import Scaffold from "../Components/Scaffold";
import NoData from "../Components/NoData";

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
        <Scaffold isLoading={loading}>
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
                <KGrid crossAxisCount={6} gap={4} alignment="start">
                  <div className="col-span-4">
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
                      {dataList.length > 0 ? (
                        <div className="relative overflow-x-auto md:rounded-lg">
                          <table className="w-full text-sm text-left text-gray-500 light:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-200 light:bg-gray-700 light:text-gray-400 text-center">
                              <tr>
                                <th
                                  scope="col"
                                  className="px-6 py-3 text-start"
                                >
                                  Role
                                </th>
                                <th
                                  scope="col"
                                  className="px-6 py-3 text-center"
                                >
                                  Profile
                                </th>
                                <th
                                  scope="col"
                                  className="px-6 py-3 text-center"
                                >
                                  Expires On
                                </th>
                                <th
                                  scope="col"
                                  className="px-6 py-3 text-center"
                                >
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
                      ) : (
                        <NoData />
                      )}
                    </ElementCard>
                  </div>
                  <div className="col-span-2">
                    <ElementCard>
                      <p className="font-medium text-[15px] text-black mb-5 pt-4">
                        Quick Links
                      </p>
                      <Link
                        to="https://hirehelix.in/documents/privacy-policy.html"
                        target="_blank"
                      >
                        <div className="rounded-full px-3 py-2 bg-white text-black cursor-pointer hover:invert border font-medium mb-2 flex items-center gap-5">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z"
                            />
                          </svg>
                          Privacy Policy
                        </div>
                      </Link>
                      <Link
                        to="https://hirehelix.in/documents/terms-conditions.html"
                        target="_blank"
                      >
                        <div className="rounded-full px-3 py-2 bg-white text-black cursor-pointer hover:invert border font-medium mb-2 flex items-center gap-5">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M3.75 6.75h16.5M3.75 12H12m-8.25 5.25h16.5"
                            />
                          </svg>
                          Terms & Conditions
                        </div>
                      </Link>
                      <Link to="https://hirehelix.in" target="_blank">
                        <div className="rounded-full px-3 py-2 bg-white text-black cursor-pointer hover:invert border font-medium mb-2 flex items-center gap-5">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418"
                            />
                          </svg>
                          Hirehelix Website
                        </div>
                      </Link>
                    </ElementCard>
                  </div>
                </KGrid>
              </ContentCard>
            </div>
          </MainContent>
        </Scaffold>
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
        <Link
          to={`/edit-vacancy?id=${data.id}`}
          className="font-medium text-blue-600 light:text-blue-500 hover:underline"
        >
          Edit
        </Link>
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
