import { Route, Routes, useNavigate } from "react-router-dom";
import LoginPage from "./Pages/LoginPage";
import DashboardPage from "./Pages/DashboardPage";
import PostVacancy from "./Pages/PostVacancy";
import ManageVacancy from "./Pages/ManageVacancy";
import ManageProfile from "./Pages/ManageProfile";
import Alert from "./Components/Alert";
import RegisterPage from "./Pages/RegisterPage";

function App() {
  return (
    <>
      <Alert />
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/post-vacancy" element={<PostVacancy />} />
        <Route path="/manage-vacancy" element={<ManageVacancy />} />
        <Route path="/manage-profile" element={<ManageProfile />} />
      </Routes>
    </>
  );
}

export default App;
