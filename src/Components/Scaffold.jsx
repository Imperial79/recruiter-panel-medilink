import React from "react";
import FullScreenLoading from "./FullScreenLoading";

function Scaffold({ isLoading, children }) {
  return (
    <div className="relative">
      <FullScreenLoading isLoading={isLoading} />
      <div className="flex flex-col">{children}</div>
    </div>
  );
}

export default Scaffold;
