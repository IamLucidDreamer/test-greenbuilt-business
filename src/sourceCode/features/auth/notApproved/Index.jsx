import React, { useEffect } from "react";
import Logo from "../../../assets/logoGreenbuilt.png";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../../store/actions/user";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { authenticated } from "../../../utils/auth";
import axios from "../../../appConfig/httpHelper";
import { toast } from "react-toastify";
import setUserDetails from "../../../store/reducers"

export const NotApproved = () => {
  const token = localStorage.getItem("jwt");
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {

    console.log(user)

    axios
    .get(`/user/get/${user.id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      toast.success("User Has been Approved by the Admin")
      console.log(res)
      dispatch(setUserDetails(res?.data?.data))
    })
    .catch((err) => console.log(err))
    
    if (token && user.role === 2) {
      if (user.isApproved) {
        navigate("/business/dashboard");
      }
    }
  }, [user]);

  return (
    <>
      <div className="min-h-screen  bg-gradient-to-br from-[#017f02] to-[#06788f] flex items-center justify-center">
        <div className="w-11/12 sm:w-9/12 md:w-2/3 lg:w-1/3 bg-white rounded-lg p-4">
          <img src={Logo} className="w-9/12 mx-auto" alt="" />

          <h1 className="text-lg font-bold text-purple-1 pt-3 text-center">
            Your Account Verification is still pending. You'll be able to login
            Once your account is Verified.
          </h1>
        </div>
      </div>
    </>
  );
};
