import React from "react";
import Alert from "./Alert";

function MainContent(props) {
  return (
    <div className="md:ml-64">
      <Alert />
      {props.children}
    </div>
  );
}

export default MainContent;
