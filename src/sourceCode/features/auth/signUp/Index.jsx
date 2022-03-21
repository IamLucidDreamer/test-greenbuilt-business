import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../assets/logoGreenbuilt.png";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { signUpBusiness } from "../../store/actions/user";
// Firebase Imports
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "../../helpers/firebase";
import SignUp from "./SignUp";
import { toast } from "react-toastify";
import { authenticated } from "../../../utils/auth";

const SignUpOtp = () => {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  const [form, setForm] = useState(1);
  const [confirmObj, setConfirmObj] = useState();
  const [businessName, setBusinessName] = useState("");
  const [businessPhone, setBusinessPhone] = useState("");

  useEffect(() => {
    if (authenticated && user.role === 2) {
      navigate("/business/dashboard");
    }
  }, [user]);

  function setUpRecaptha(number) {
    const recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha-container",
      {},
      auth
    );
    recaptchaVerifier.render();
    return signInWithPhoneNumber(auth, number, recaptchaVerifier);
  }

  const getOTP = async (name, phoneNumber, countryCode) => {
    console.log(name, phoneNumber);
    const number = `${countryCode}${phoneNumber}`;
    try {
      const response = await setUpRecaptha(number);
      if (response) {
        setForm(3);
        toast.success("OTP Sent Successfully");
      }
      console.log(response);
      setConfirmObj(response);
    } catch (err) {
      toast.error(`Unable to Send the OTP. ${err.message}`);
      setForm(1);
    }
  };

  const onOTPSuccess = () => setForm(4);

  const onPhoneNumberChange = () => setForm(1);

  const formik = useFormik({
    initialValues: {
      name: "",
      phoneNumber: "",
      countryCode: "+91",
    },

    validationSchema: Yup.object({
      name: Yup.string()
        .max(15, "Must be 15 characters or less")
        .required("Required"),
      phoneNumber: Yup.string()
        .required("Required")
        .min(10, "Must be 10 characters"),
      // .max(10, 'Must be 10 characters'),
      countryCode: Yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      const { name, phoneNumber, countryCode } = values;
      getOTP(name, phoneNumber, countryCode);
      setBusinessName(name);
      setBusinessPhone(`${countryCode}${phoneNumber}`);
      setForm(2);
    },
  });

  return (
    <div>
      <div className="min-h-screen bg-gradient-to-br from-[#017f02] to-[#06788f] flex items-center justify-center">
        <div className="w-9/12 md:w-1/2 lg:w-1/3 bg-white rounded-lg p-4 max-h-screen overflow-y-scroll">
          <img src={Logo} className="w-9/12 mx-auto" alt="" />
          <h1 className="text-xs text-purple-1 pt-3 text-center">
            SignUp with Credentials
          </h1>
          {form === 1 || form === 2 ? (
            <form className="" onSubmit={formik.handleSubmit}>
              <div className="my-2 flex flex-col">
                <label className="text-sm text-purple-1 py-1.5 font-semibold">
                  Industry / Business Name
                </label>
                <input
                  type="text"
                  autocapitalize="word"
                  placeholder="Name"
                  className="p-1.5 rounded-lg bg-purple-1 bg-opacity-10 border-2 border-purple-1"
                  {...formik.getFieldProps("name")}
                />
                {formik.touched.name && formik.errors.name ? (
                  <div>{formik.errors.name}</div>
                ) : null}
              </div>
              <div className="my-2 flex flex-col">
                <label className="text-sm text-purple-1 py-1.5 font-semibold">
                  Phone Number
                </label>
                <div className="flex w-full ">
                  <select
                    className="w-3/12 p-1.5 rounded-lg bg-purple-1 bg-opacity-10 border-2 border-purple-1 mr-2"
                    {...formik.getFieldProps("countryCode")}
                  >
                    <option value={"+91"}>India</option>
                    {CountryCodes.map((data, index) => (
                      <option value={data.dial_code}>{data.name}</option>
                    ))}
                  </select>
                  <input
                    placeholder="Phone Number"
                    className="w-full p-1.5 rounded-lg bg-purple-1 bg-opacity-10 border-2 border-purple-1"
                    type="tel"
                    {...formik.getFieldProps("phoneNumber")}
                  />
                </div>
                <div className="flex">
                  {formik.touched.countryCode && formik.errors.countryCode ? (
                    <div className="mr-4">{formik.errors.countryCode}</div>
                  ) : null}
                  {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
                    <div>{formik.errors.phoneNumber}</div>
                  ) : null}
                </div>
              </div>
              <div className="flex justify-center items-center p-1">
                <div id="recaptcha-container"></div>
              </div>
              {form === 1 ? (
                <button
                  type="submit"
                  className="w-full py-1.5 my-3 bg-purple-1 border-2 border-purple-1 focus:outline-none hover:bg-green-1 rounded text-base text-white font-bold hover:text-purple-1 duration-500"
                >
                  SignUp
                </button>
              ) : null}
            </form>
          ) : null}
          {form === 3 ? (
            <OtpScreen
              confirmObj={confirmObj}
              businessName={businessName}
              businessPhone={businessPhone}
              handlePhoneChange={onPhoneNumberChange}
              OTPSuccess={onOTPSuccess}
            />
          ) : null}
          {form === 4 ? (
            <SignUp businessName={businessName} businessPhone={businessPhone} />
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

export default SignUpOtp;

const OtpScreen = (props) => {
  const formik = useFormik({
    initialValues: {
      otp: "",
    },
    validationSchema: Yup.object({
      otp: Yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      const { otp } = values;
      console.log(otp);
      getVerify(otp);
    },
  });

  const getVerify = (otp) => {
    console.log(otp);
    props.confirmObj
      .confirm(otp)
      .then((res) => {
        console.log(res, "Success");
        toast.success("OTP Verified Successfully");
        props.OTPSuccess();
      })
      .catch((err) => {
        console.log(err);
        toast.error("OTP Verification Failed");
      });
  };
  return (
    <form className="" onSubmit={formik.handleSubmit}>
      <h1 className="text-base font-semibold">
        Hello, <span className="text-base font-bold">{props.businessName}</span>
      </h1>
      <h1 className="text-base font-semibold">
        OTP Sent to{" "}
        <span className="text-base font-bold">{props.businessPhone}</span>
        <button
          className="text-sm px-2 hover:underline font-bold text-purple-1"
          onClick={() => props.handlePhoneChange()}
        >
          Change Number
        </button>
      </h1>
      <div className="my-2 flex flex-col">
        <label className="text-sm text-purple-1 py-1.5 font-semibold">
          Enter OTP
        </label>
        <input
          type="text"
          autocapitalize="word"
          placeholder="Enter OTP"
          className="p-1.5 rounded-lg bg-purple-1 bg-opacity-10 border-2 border-purple-1"
          {...formik.getFieldProps("otp")}
        />
        {formik.touched.otp && formik.errors.otp ? (
          <div>{formik.errors.otp}</div>
        ) : null}
      </div>
      <button
        type="submit"
        className="w-full py-1.5 my-3 bg-purple-1 border-2 border-purple-1 focus:outline-none hover:bg-green-1 rounded text-base text-white font-bold hover:text-purple-1 duration-500"
      >
        Verify
      </button>
    </form>
  );
};
