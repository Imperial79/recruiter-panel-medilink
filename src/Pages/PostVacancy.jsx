import React from "react";
import MainContent from "../Components/MainContent";
import Sidebar from "../Components/Sidebar";

function PostVacancy() {
  return (
    <div>
      <Sidebar activeTab={1} />

      <MainContent>
        <h1>Post Vacancy</h1>
      </MainContent>
    </div>
  );
}

export default PostVacancy;
