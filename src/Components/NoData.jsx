import React from "react";
import noData from "../assets/no-data.svg";

function NoData() {
  return (
    <div className="text-gray-500 text-xl font-bold mx-auto flex flex-col text-center">
      <img src={noData} alt="no-data" className="h-[200px] mb-10" />

      <p>Sorry! No data</p>
    </div>
  );
}

export default NoData;
