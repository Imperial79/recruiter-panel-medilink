import React, { useContext } from "react";
import { Context } from "../Components/ContextProvider";
import Scaffold from "../Components/Scaffold";
import KGrid from "../Components/KGrid";

function MedilinkResume() {
  const { user, authLoading } = useContext(Context);

  return (
    <Scaffold isLoading={authLoading}>
      <div className="my-20">
        <FormCard
          header={
            <div className="md:flex gap-10 items-start w-full">
              <div className="mx-auto md:mb-0 mb-5 w-1/6">
                <img
                  src={user?.image}
                  alt="user-image"
                  className="object-contain"
                />
              </div>
              <div className="text-white md:text-start text-center w-full">
                <h1 className="font-medium md:text-4xl text-2xl tracking-wide">
                  {user?.firstName} {user?.lastName}
                </h1>
                <h3 className="font-normal md:text-2xl text-xl uppercase">
                  Doctor
                </h3>
                <div className="text-start">
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
                          className="w-6 h-6 text-white object-fill"
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
                      content={user?.address}
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
                          className="w-6 h-6 text-white"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M16.5 12a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0Zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 1 0-2.636 6.364M16.5 12V8.25"
                          />
                        </svg>
                      }
                      content={user?.email}
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
                          className="w-6 h-6 text-white"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
                          />
                        </svg>
                      }
                      content={"+91 " + user?.phone.replace("+91", "")}
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
                          className="w-6 h-6 text-white"
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
              <DetailBlock
                heading="Profile"
                content="Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias,explicabo aspernatur. Corporis, sed sapiente nobis porro officia
                  velit dolor excepturi quibusdam ea quaerat minima non magninatus inventore sit accusamus."
              />
              <DetailBlock
                heading="Expertise"
                content="Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias, explicabo aspernatur. Corporis, sed sapiente nobis porro officia velit dolor excepturi quibusdam ea quaerat minima non magninatus inventore sit accusamus."
              />
              <DetailBlock
                margin="mb-0"
                heading="Skills"
                content="Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias, explicabo aspernatur. Corporis, sed sapiente nobis porro officia velit dolor excepturi quibusdam ea quaerat minima non magninatus inventore sit accusamus."
              />
            </div>
            <div>
              <DetailBlock
                heading="Education"
                content="Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias,explicabo aspernatur. Corporis, sed sapiente nobis porro officia
                  velit dolor excepturi quibusdam ea quaerat minima non magninatus inventore sit accusamus.Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias,explicabo aspernatur. 
                  Corporis, sed sapiente nobis porro officia
                  velit dolor excepturi quibusdam ea quaerat minima non magninatus inventore sit accusamus."
              />
              <DetailBlock
                margin="mb-0"
                heading="Experience"
                content="Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias, explicabo aspernatur. Corporis, sed sapiente nobis porro officia velit dolor excepturi quibusdam ea quaerat minima non magninatus inventore sit accusamus.sed sapiente nobis porro officia
                  velit dolor excepturi quibusdam ea quaerat minima non magninatus inventore sit accusamus.Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias,explicabo aspernatur. 
                  Corporis, sed sapiente nobis porro officia
                  velit dolor excepturi quibusdam ea quaerat minima non magninatus inventore sit accusamus."
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
      <p className="text-sm mt-5 text-gray-500">{content}</p>
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
        </div>
      </div>
    </>
  );
}

function Element({ icon, content }) {
  return (
    <div className="inline-flex items-start md:mb-0 mb-4">
      <div className="w-[5px] h-[5px] md:mr-10 mr-10">{icon}</div>
      <p className="text-white text-sm min-w-[300px] ">{content}</p>
    </div>
  );
}
