import { Routes, Route , Navigate } from "react-router-dom";

// BrowserRouter as Router ,
import Login from "./Authentication/login";
import Dashboard from "./Dashboard";
import AdminFormLists from "./WshcmForm";

import { Header } from "../layouts/headers";
import { Sidebar } from "../layouts/sidebar";

import "../assets/css/adminPanel.css";

const isAuth = localStorage.getItem("isAuth") || false;
console.log("Authentication : ", isAuth);

import { REG_FORM_URL_CLIENT_PATH } from "../courseExplanations/RegistrationFormUrl/formUrls";

const AdminPanel = () => {
  return (
    <>
      {!isAuth ? (
        <Routes>
          <Route path="/" element={<Login />} />

          <Route path="*" element={<Navigate to="/admin" replace />} />
        </Routes>
      ) : (
        <div className="d-flex" id="wrapper">
          <Sidebar />
          <div id="page-content-wrapper">
            <Header />

            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/awshpForm" element={<AdminFormLists formName={'AWSHP'} addFormUrl={REG_FORM_URL_CLIENT_PATH.awshpForm} />} />
              <Route path="/wshcmForm" element={<AdminFormLists formName={'WSHCM'} addFormUrl={REG_FORM_URL_CLIENT_PATH.wshcmForm} />} />

              <Route path="*" element={<Navigate to="/admin" replace />} />
            </Routes>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminPanel;
