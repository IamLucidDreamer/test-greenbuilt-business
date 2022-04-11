import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// Import Helpers
import { authenticated } from "../../utils/auth";

// Import Components to show Screens
import { Home } from "../main/Index";
import { Login } from "../auth/logIn/Index";
import { SignUp } from "../auth/signUp/Index";
import { Products } from "../products/Index";
import { Dashboard } from "../dashboard/Index";
import { DashboardStats } from "../dashboardStats/Index";
import { GenerateQr } from "../generateQr/Index";
import { Documents } from "../documents/Index";
import { History } from "../history/Index";
import { GenerationPlan } from "../generationPlan/Index";
import { ActualConsumption } from "../actualConsumption/Index";
import { NotApproved } from "../auth/notApproved/Index";
import {
  getIndustryType,
  getPackagingType,
  getSourceType,
  getUom,
} from "../../store/actions/statics";

export const Navigation = () => {
  const user = useSelector((state) => state.user);
  const auth = useSelector((state) => state.user.auth);
  const token = JSON.parse(localStorage.getItem("jwt"));

  const dispatch = useDispatch();

  const navigate = useNavigate();
  const handleUnAuth = () => navigate("/login");

  useEffect(() => {
    dispatch(getIndustryType());
    dispatch(getSourceType());
    dispatch(getUom());
    dispatch(getPackagingType());
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/notapproved" element={<NotApproved />} />

      {/* Handling the Business User Routes */}

      {user.role === 2 && token && auth ? (
        <>
          <Route path="/business" element={<Dashboard />}>
            <Route path="dashboard" element={<DashboardStats />} />
            <Route path="product" element={<Products />} />
            <Route path="generateqr" element={<GenerateQr />} />
            <Route path="generationplan" element={<GenerationPlan />} />
            <Route path="actualconsumption" element={<ActualConsumption />} />
            <Route path="documents" element={<Documents />} />
            <Route path="history" element={<History />} />
          </Route>
        </>
      ) : (
        () => handleUnAuth()
      )}
      <Route path="*" element={<Login />} />
    </Routes>
  );
};
