import React from "react";

function ContentCard(props) {
  return (
    <div className="p-4 bg-gray-50 rounded-[27px] mt-5 md:mx-0">
      {props.children}
    </div>
  );
}

export default ContentCard;
