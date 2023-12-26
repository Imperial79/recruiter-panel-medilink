import React, { useEffect, useState } from "react";
import Scaffold from "../Components/Scaffold";
import { KGrid } from "../Components/components";
import { useLocation } from "react-router-dom";
import logo from "../assets/logo.jpg";
import { dbObject } from "../Helper/Constants";

function MedilinkResume() {
  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);
  const id = urlParams.get("id");

  const [resumeData, setresumeData] = useState({
    image: "",
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    bio: "",
    expertiseDescription: "",
    workDescription: "",
    educationDescription: "",
  });

  const [loading, setloading] = useState(false);
  const [expertiseList, setexpertiseList] = useState([]);
  const [educationList, seteducationList] = useState([]);
  const [workList, setworkList] = useState([]);

  async function fetchResumeData() {
    try {
      setloading(true);
      const formData = new FormData();
      formData.append("jobFinderId", id);
      const response = await dbObject.post(
        "/resume/fetch-medilink-resume.php",
        formData
      );
      console.log(response.data);

      if (!response.data.error) {
        setresumeData(response.data.response);

        setexpertiseList(
          JSON.parse(response.data.response.expertiseDescription)
        );
        seteducationList(
          JSON.parse(response.data.response.educationDescription)
        );
        setworkList(JSON.parse(response.data.response.workDescription));
      }
      setloading(false);
    } catch (error) {
      console.log(error);
      setloading(false);
    }
  }

  useEffect(() => {
    fetchResumeData();
  }, []);

  return (
    <Scaffold isLoading={loading}>
      <div className="my-20">
        <FormCard
          header={
            <div>
              <div className="md:flex gap-10 items-start w-full">
                <div className="mx-auto md:mb-0 mb-5 md:w-1/6 w-[100px]">
                  <img
                    src={resumeData?.image}
                    alt="user-image"
                    className="object-cover"
                  />
                </div>
                <div className="text-white md:text-start text-center w-full">
                  <h1 className="font-medium md:text-4xl text-2xl tracking-wide">
                    {resumeData?.firstName} {resumeData?.lastName}
                  </h1>
                  <h3 className="font-normal md:text-xl text-lg uppercase tracking-widest">
                    {resumeData?.subRole}
                  </h3>

                  <KGrid margin="mt-10" alignment="start">
                    <Element
                      icon={
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          dataslot="icon"
                          className="md:h-6 h-5 md:w-6 w-5 text-white"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                          />
                        </svg>
                      }
                      content={resumeData?.address}
                    />
                    <Element
                      icon={
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          dataslot="icon"
                          className="md:h-6 h-5 md:w-6 w-5 text-white"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M16.5 12a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0Zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 1 0-2.636 6.364M16.5 12V8.25"
                          />
                        </svg>
                      }
                      content={resumeData?.email}
                    />

                    <Element
                      icon={
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          dataslot="icon"
                          className="md:h-6 h-5 md:w-6 w-5 text-white"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
                          />
                        </svg>
                      }
                      content={"+91 " + resumeData?.phone.replace("+91", "")}
                    />

                    <Element
                      icon={
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          dataslot="icon"
                          className="md:h-6 h-5 md:w-6 w-5 text-white"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244"
                          />
                        </svg>
                      }
                      content="www.linkedin.com/prof"
                    />
                  </KGrid>
                </div>
              </div>
            </div>
          }
        >
          <KGrid alignment="start">
            <div>
              <DetailBlock heading="Profile" content={resumeData?.bio} />
              <DetailBlock
                heading="Expertise"
                content={
                  <ul className="list-disc">
                    {expertiseList.map((data, index) => (
                      <li key={index} className="mb-1.5">
                        {data}
                      </li>
                    ))}
                  </ul>
                }
              />
            </div>
            <div>
              <DetailBlock
                heading="Education"
                content={
                  <div>
                    {educationList.map((data, index) => (
                      <div key={index} className="mb-5">
                        <h2 className="font-bold uppercase text-lg leading-tight">
                          {data.courseName}
                        </h2>
                        <h2 className="font-bold uppercase text-lg">
                          {data.year}
                        </h2>
                        <p className="font-medium text-sm text-gray-400">
                          {data.courseDescription}
                        </p>
                      </div>
                    ))}
                  </div>
                }
              />
              <DetailBlock
                margin="mb-0"
                heading="Experience"
                content={
                  <div>
                    {workList.map((data, index) => (
                      <div key={index} className="mb-5">
                        <h2 className="font-bold uppercase text-lg leading-tight">
                          {data.companyName}
                        </h2>
                        <h2 className="font-bold uppercase text-lg">
                          {data.year}
                        </h2>
                        <p className="font-medium text-sm text-gray-400">
                          {data.designation}
                        </p>
                        <p className="font-medium text-sm text-gray-400">
                          {data.workDescription}
                        </p>
                      </div>
                    ))}
                  </div>
                }
              />
            </div>
          </KGrid>
        </FormCard>
      </div>
    </Scaffold>
  );
}

export default MedilinkResume;

function DetailBlock({ heading, content, margin = "mb-10" }) {
  return (
    <div className={margin}>
      <h1 className="font-bold text-2xl text-blue-900 uppercase tracking-wider">
        {">"} {heading}
      </h1>
      <div className="text-sm mt-5 text-gray-500 ml-5">{content}</div>
    </div>
  );
}

function FormCard({ header, children }) {
  return (
    <>
      <div className="mx-5 text-black md:max-w-[900px] lg:mx-auto content-center">
        <div className="border border-gray-200 rounded-xl bg-white">
          <div className="w-full object-contain bg-blue-950 overflow-hidden rounded-t-xl relative p-10">
            {header}
          </div>

          <div className="md:p-7 p-5 md:m-14 m-5">{children}</div>
          <p className="m-5 inline-flex items-center gap-2">
            Created by <img src={logo} alt="logo" className="w-32" />
          </p>
        </div>
      </div>
    </>
  );
}

function Element({ icon, content }) {
  return (
    <div className="flex text-start items-start md:mb-0 mb-4 md:gap-5 gap-3">
      <div className="flex-shrink-0">{icon}</div>
      <p className="text-white text-sm text-start">{content}</p>
    </div>
  );
}
