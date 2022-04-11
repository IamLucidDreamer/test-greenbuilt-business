import React, { useEffect, useReducer, useState } from "react";
import axios from "../../appConfig/httpHelper";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { Button } from "antd";
import { MonthlyPlan } from "./components/MonthlyPlan";
import { ProductPlan } from "./components/ProductPlan";

export const GenerationPlan = () => {
  const navigate = useNavigate();
  const token = JSON.parse(localStorage.getItem("jwt"));
  const user = useSelector((state) => state.user);

  return (
    <div className="">
      <div className="flex justify-around items-center mt-4"></div>
      <ProductPlan />
    </div>
  );
};
