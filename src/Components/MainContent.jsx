import React from "react";
import Loading from "../Components/Loading";

function MainContent(props) {
  return (
    <div className="md:ml-64 md:mt-[30px] pb-[20px]">
      <div className="relative">
        <div
          className={`absolute w-full z-50 h-full bg-white opacity-75 ${
            props.loading ? "" : "hidden"
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
