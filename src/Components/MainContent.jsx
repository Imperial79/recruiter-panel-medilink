import React from "react";

function MainContent(props) {
  return (
    <div className="md:ml-64 md:p-[20px] p-[10px] py-[20px]">
      {props.children}
    </div>
  );
}

export default MainContent;
