import React from "react";
import Sidebar from "../Components/Sidebar";
import MainContent from "../Components/MainContent";
import IsAuthTag from "../Components/IsAuthTag";

function ManageVacancy() {
  return (
    <IsAuthTag>
      <Sidebar activeTab={2} />

      <MainContent>
        <h1>Manage Vacancy</h1>
      </MainContent>
    </IsAuthTag>
  );
}

export default ManageVacancy;
