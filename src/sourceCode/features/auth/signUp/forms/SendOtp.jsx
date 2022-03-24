import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { CountryCodes } from "../data/countryCodes";
import { toast } from "react-toastify";

// Firebase Imports
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "../../../../appConfig/firebase";

export const SendOtp = (props) => {
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
        props.changeFormNumber(3);
        toast.success("OTP Sent Successfully");
      }
      console.log(response);
      props.changeConfirmObj(response);
    } catch (err) {
      toast.error(`Unable to Send the OTP. ${err.message}`);
      props.changeFormNumber(1);
    }
  };

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
        .min(10, "Must be 10 characters")
        .max(10, "Must be 10 characters"),
      countryCode: Yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      const { name, phoneNumber, countryCode } = values;
      getOTP(name, phoneNumber, countryCode);
      props.businessDetails(name, `${countryCode}${phoneNumber}`);
      props.changeFormNumber(2);
    },
  });

  return (
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
      {props.formNumber === 1 ? (
        <button
          type="submit"
          className="w-full py-1.5 my-3 bg-purple-1 border-2 border-purple-1 focus:outline-none hover:bg-green-1 rounded text-base text-white font-bold hover:text-purple-1 duration-500"
        >
          SignUp
        </button>
      ) : null}
    </form>
  );
};
