import React from "react";

function MainContent(props) {
  return <div className="md:ml-64 md:mt-[30px]">{props.children}</div>;
}

export default MainContent;
