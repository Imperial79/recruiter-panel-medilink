import React from "react";
import Loading from "../Components/Loading";

function MainContent(props) {
  return (
    <div
      className={`md:ml-64 lg:ml-64 sm:ml-0 md:mt-[30px] pb-[20px] ${
        props.loading ? "overflow-hidden" : ""
      }`}
    >
      <div className="relative">
        <div
          className={`w-full z-50 h-screen bg-white opacity-75 ${
            props.loading ? "absolute" : "hidden"
          }`}
        >
          <Loading />
        </div>
        {props.children}
      </div>
    </div>
  );
}

export default MainContent;
