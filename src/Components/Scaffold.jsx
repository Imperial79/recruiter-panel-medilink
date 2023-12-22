import React from "react";
import FullScreenLoading from "./FullScreenLoading";

function Scaffold({ isLoading, children }) {
  return (
    <div className="relative">
      <FullScreenLoading isLoading={isLoading} />
      {children}
    </div>
  );
}

export default Scaffold;
