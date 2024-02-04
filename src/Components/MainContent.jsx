import React from "react";

function MainContent({ children }) {
  return (
    <div className="md:ml-64 sm:ml-0 md:mt-[30px] pb-[20px]">{children}</div>
  );
}

export default MainContent;
