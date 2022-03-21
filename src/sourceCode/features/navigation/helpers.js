import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import isEmpty from "../../utils/isEmpty";

const HandleUnAuth = () => {
  const navigate = useNavigate();
  navigate("/login");
};

const authenticated = () => {
  const token = JSON.parse(localStorage.getItem("jwt"));
  return isEmpty(token);
};

const UserRole = () => {
  const user = useSelector((state) => state.user);
  return user.role;
};

export { UserRole, authenticated, HandleUnAuth };
