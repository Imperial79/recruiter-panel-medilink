import { Route, Routes } from "react-router-dom";
import LoginPage from "./Pages/LoginPage";
import DashboardPage from "./Pages/DashboardPage";
import PostVacancy from "./Pages/PostVacancy";
import ManageVacancy from "./Pages/ManageVacancy";
import ManageProfile from "./Pages/ManageProfile";
import Alert from "./Components/Alert";
import RegisterPage from "./Pages/RegisterPage";
import CandidateList from "./Pages/CadidateList";
import EditVacancy from "./Pages/EditVacancy";

function App() {
  return (
    <>
      <Alert />
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/post-vacancy" element={<PostVacancy />} />
        <Route path="/edit-vacancy" element={<EditVacancy />} />
        <Route path="/manage-vacancy" element={<ManageVacancy />} />
        <Route path="/manage-vacancy/candidates" element={<CandidateList />} />
        <Route path="/manage-profile" element={<ManageProfile />} />
      </Routes>
    </>
  );
}

export default App;
