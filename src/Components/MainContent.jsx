import React from "react";

function MainContent(props) {
  return (
    <div className="md:ml-64 lg:ml-64 sm:ml-0 md:mt-[30px] pb-[20px] min-h-screen">
      {props.children}
    </div>
  );
}

export default MainContent;
