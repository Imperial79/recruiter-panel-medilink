import React, { useContext, useState } from "react";
import Sidebar from "../Components/Sidebar";
import MainContent from "../Components/MainContent";
import { Context } from "../Components/ContextProvider";
import AuthLoading from "../Components/AuthLoading";

function ManageVacancy() {
  const { user, authLoading } = useContext(Context);
  const [loading, setLoading] = useState(false);
  return (
    <>
      {authLoading ? (
        <AuthLoading />
      ) : (
        <div>
          <Sidebar activeTab={2} />
          <MainContent loading={loading}>
            <h1>Manage Vacancy</h1>
          </MainContent>
        </div>
      )}
    </>
  );
}

export default ManageVacancy;
