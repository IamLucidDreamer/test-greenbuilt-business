import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../../assets/logoGreenbuilt.png";
import { useSelector } from "react-redux";
import { authenticated } from "../../../utils/auth";

// Components Import
import { SendOtp } from "./forms/SendOtp";
import { VerifyOtp } from "./forms/VerifyOtp";
import { UserDetails } from "./forms/UserDetails";

export const SignUp = () => {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  const [form, setForm] = useState(1);
  const [confirmObj, setConfirmObj] = useState();
  const [businessName, setBusinessName] = useState("");
  const [businessPhone, setBusinessPhone] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token && user.role === 2) {
      if (user.isApproved) {
        navigate("/business/dashboard");
      } else {
        navigate("notapproved");
      }
    }
  }, [user]);

  // Functions to append state from the children components
  const setFormValue = (formNumber) => setForm(formNumber);
  const setConfirmValue = (value) => setConfirmObj(value);
  const businessDetails = (name, phone) => {
    setBusinessName(name);
    setBusinessPhone(phone);
  };

  return (
    <div>
      <div className="min-h-screen bg-gradient-to-br from-[#017f02] to-[#06788f] flex items-center justify-center">
        <div className="w-9/12 md:w-1/2 lg:w-1/3 bg-white rounded-lg p-4 max-h-screen overflow-y-scroll">
          <img src={Logo} className="w-9/12 mx-auto" alt="" />
          <h1 className="text-xs text-purple-1 pt-3 text-center">
            SignUp with Credentials
          </h1>
          {form === 1 || form === 2 ? (
            <SendOtp
              formNumber={form}
              businessDetails={businessDetails}
              changeFormNumber={setFormValue}
              changeConfirmObj={setConfirmValue}
            />
          ) : null}
          {form === 3 ? (
            <VerifyOtp
              confirmObj={confirmObj}
              businessName={businessName}
              businessPhone={businessPhone}
              changeFormNumber={setFormValue}
            />
          ) : null}
          {form === 4 ? (
            <UserDetails
              businessName={businessName}
              businessPhone={businessPhone}
            />
          ) : null}
          <h1 className="text-xs text-purple-1 pt-2 text-center">
            Already have an account ?{" "}
            <Link to="../login" className="font-bold hover:underline">
              {" "}
              Log In
            </Link>
          </h1>
        </div>
      </div>
    </div>
  );
};
