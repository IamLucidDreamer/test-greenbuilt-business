import React from "react";
import { Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

// Import Helpers
import { authenticated } from "../../utils/auth";

// Import Components to show Screens
import { Home } from "../main/Index";
import { Login } from "../auth/logIn/Index";
import { SignUp } from "../auth/signUp/Index";
import { Products } from "../products/Index";
import { Dashboard } from "../dashboard/Index";
import { DashboardStats } from "../dashboardStats/Index";
import { AddNewProduct } from "../addNewProduct/Index";
import { GenerateQr } from "../generateQr/Index";
import { Documents } from "../documents/Index";
import { History } from "../history/Index";
import { GenerationPlan } from "../generationPlan/Index";
import { RequestPoints } from "../requestPoints/Index";

export const Navigation = () => {
  const user = useSelector((state) => state.user);
  const auth = useSelector((state) => state.user.auth);
  const token = JSON.parse(localStorage.getItem("jwt"));

  const navigate = useNavigate();
  const handleUnAuth = () => navigate("/login");

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />

      {/* Handling the Business User Routes */}

      {user.role === 2 && token && auth ? (
        <>
          <Route path="/business" element={<Dashboard />}>
            <Route path="dashboard" element={<DashboardStats />} />
            <Route path="product" element={<Products />} />
            <Route path="generateqr" element={<GenerateQr />} />
            <Route path="generationplan" element={<GenerationPlan />} />
            <Route path="requestpoints" element={<RequestPoints />} />
            <Route path="documents" element={<Documents />} />
            <Route path="history" element={<History />} />
          </Route>
          <Route path="/newproduct" element={<AddNewProduct />} />
        </>
      ) : (
        () => handleUnAuth()
      )}
      <Route path="*" element={<Login />} />
    </Routes>
  );
};
