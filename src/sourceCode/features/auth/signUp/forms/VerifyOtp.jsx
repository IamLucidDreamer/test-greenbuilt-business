import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";

export const VerifyOtp = (props) => {
  const formik = useFormik({
    initialValues: {
      otp: "",
    },
    validationSchema: Yup.object({
      otp: Yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      const { otp } = values;
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
        props.changeFormNumber(4);
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
          onClick={() => props.changeFormNumber(1)}
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
