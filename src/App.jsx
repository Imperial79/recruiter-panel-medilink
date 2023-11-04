import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./Pages/LoginPage";
import DashboardPage from "./Pages/DashboardPage";
import PostVacancy from "./Pages/PostVacancy";
import ManageVacancy from "./Pages/ManageVacancy";
import ManageProfile from "./Pages/ManageProfile";
import ContextProvider from "./Components/ContextProvider";
import { useState } from "react";
import Alert from "./Components/Alert";

function App() {
  // const [errorMsg, setErrorMsg] = useState("");
  return (
    <>
      {/* <ContextProvider> */}
      {/* <BrowserRouter> */}

      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/post-vacancy" element={<PostVacancy />} />
        <Route path="/manage-vacancy" element={<ManageVacancy />} />
        <Route path="/manage-profile" element={<ManageProfile />} />
      </Routes>
      {/* </BrowserRouter> */}
      {/* </ContextProvider> */}
    </>
  );
}

export default App;
