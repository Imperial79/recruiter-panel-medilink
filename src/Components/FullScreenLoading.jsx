import React from "react";
import Loading from "./Loading";

function FullScreenLoading({ children, isLoading }) {
  return (
    <div className={`relative ${isLoading ? "overflow-y-hidden" : ""}`}>
      <div
        className={`w-full z-50 h-screen bg-white/80 ${
          isLoading ? "absolute" : "hidden"
        }`}
      >
        <Loading />
      </div>
      {children}
    </div>
  );
}

export default FullScreenLoading;
