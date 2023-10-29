import React from "react";
import Sidebar from "../Components/Sidebar";
import MainContent from "../Components/MainContent";

function ManageVacancy() {
  return (
    <div>
      <Sidebar activeTab={2} />

      <MainContent>
        <h1>Manage Vacancy</h1>
      </MainContent>
    </div>
  );
}

export default ManageVacancy;
