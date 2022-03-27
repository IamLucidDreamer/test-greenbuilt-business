import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "../../appConfig/httpHelper";
import { toast } from "react-toastify";

export const RequestPoints = () => {
  const token = JSON.parse(localStorage.getItem("jwt"));

  const handleLogin = (loginValue) => {
    console.log(loginValue.ebBill);
    const formData = new FormData();
    formData.append("file", loginValue.ebBill);
    formData.append("totalConsumption", loginValue.totalConsumption);
    formData.append("totalGreenConsumption", loginValue.greenConsumption);
    console.log(formData);
    axios
      .post("/document/upload/1", formData, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => toast.success(res.data.message))
      .catch((err) => console.log(err));
  };

  const formik = useFormik({
    initialValues: {
      totalConsumption: "",
      greenConsumption: "",
      ebBill: "",
    },
    validationSchema: Yup.object({
      totalConsumption: Yup.string().required("Required"),
      greenConsumption: Yup.string().required("Required"),
      ebBill: Yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      handleLogin(values);
    },
  });
  return (
    <div>
      <h1 className="text-2xl text-purple-1 mt-2 font-bold">Request Points</h1>
      <form className="" onSubmit={formik.handleSubmit}>
        <div className="my-2 flex flex-col">
          <label className="text-sm text-purple-1 py-1.5 font-semibold">
            Total Consumption
          </label>
          <input
            placeholder="Total Consumption"
            className="p-1.5 rounded-lg bg-purple-1 bg-opacity-10 border-2 border-purple-1"
            {...formik.getFieldProps("totalConsumption")}
          />
          {formik.touched.totalConsumption && formik.errors.totalConsumption ? (
            <div> {formik.errors.totalConsumption}</div>
          ) : null}
        </div>
        <div className="my-2 flex flex-col">
          <label className="text-sm text-purple-1 py-1.5 font-semibold">
            Green Consumption
          </label>
          <input
            placeholder="Green Consumption"
            className="p-1.5 rounded-lg bg-purple-1 bg-opacity-10 border-2 border-purple-1"
            {...formik.getFieldProps("greenConsumption")}
          />
          {formik.touched.greenConsumption && formik.errors.greenConsumption ? (
            <div>{formik.errors.greenConsumption}</div>
          ) : null}
        </div>
        <div className="my-2 flex flex-col">
          <label className="text-sm text-purple-1 py-1.5 font-semibold">
            EB Bill
          </label>
          <input
            type="file"
            className="p-1.5 rounded-lg bg-purple-1 bg-opacity-10 border-2 border-purple-1"
            onChange={(event) => {
              console.log(event.target.files);
              formik.setFieldValue("ebBill", event.currentTarget.files[0]);
            }}
          />
          {formik.touched.ebBill && formik.errors.ebBill ? (
            <div>{formik.errors.ebBill}</div>
          ) : null}
        </div>
        <button
          type="submit"
          className="w-full py-1.5 my-3 bg-purple-1 border-2 border-purple-1 focus:outline-none hover:bg-green-1 rounded text-base text-white font-bold hover:text-purple-1 duration-500"
        >
          Request
        </button>
      </form>
    </div>
  );
};
