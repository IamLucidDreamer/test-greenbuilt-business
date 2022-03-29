import React from "react";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import axios from "../../../appConfig/httpHelper";
import * as Yup from "yup";

export const ProductPlan = () => {
  const formik = useFormik({
    initialValues: {
      productName: "",
      uom: "",
      totalProduction: "",
      qrCodeRequired: "",
    },
    validationSchema: Yup.object({
      productName: Yup.string().required("Required"),
      uom: Yup.string().required("Required"),
      totalProduction: Yup.string().required("Required"),
      qrCodeRequired: Yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      handleCreateMonthlyPlan(values);
    },
  });

  const handleCreateMonthlyPlan = (values) => {
    const token = JSON.parse(localStorage.getItem("jwt"));
    // const data = {
    //   data: [
    //     {
    //       sourceType: "Wind",
    //       ownCaptive: 5000,
    //       groupCaptive: 10000,
    //       thirdPartyPurchase: 4500,
    //     },
    //     {
    //       sourceType: "Hydro",
    //       ownCaptive: 0,
    //       groupCaptive: 9000,
    //       thirdPartyPurchase: 0,
    //     },
    //   ],
    // };
    // console.log(data);
    const data = {};
    axios
      .post("/monthly-plan/product/create", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        toast.success(res.data.message);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Monthly Plan Not Saved");
      });
  };

  return (
    <div>
      <h1 className="text-2xl text-purple-1 mt-2 font-bold">Product Plan</h1>
      <form className="" onSubmit={formik.handleSubmit}>
        <div className="my-2 flex flex-col">
          <label className="text-sm text-purple-1 py-1.5 font-semibold">
            Product Name
          </label>
          <input
            placeholder="Product Name"
            className="p-1.5 rounded-lg bg-purple-1 bg-opacity-10 border-2 border-purple-1"
            {...formik.getFieldProps("productName")}
          />
          {formik.touched.productName && formik.errors.productName ? (
            <div> {formik.errors.productName}</div>
          ) : null}
        </div>
        <div className="my-2 flex flex-col">
          <label className="text-sm text-purple-1 py-1.5 font-semibold">
            Unit of Measurement
          </label>
          <input
            placeholder="Unit of Measurement"
            className="p-1.5 rounded-lg bg-purple-1 bg-opacity-10 border-2 border-purple-1"
            {...formik.getFieldProps("uom")}
          />
          {formik.touched.uom && formik.errors.uom ? (
            <div>{formik.errors.uom}</div>
          ) : null}
        </div>
        <div className="my-2 flex flex-col">
          <label className="text-sm text-purple-1 py-1.5 font-semibold">
            Total Production
          </label>
          <input
            placeholder="Total Production"
            className="p-1.5 rounded-lg bg-purple-1 bg-opacity-10 border-2 border-purple-1"
            {...formik.getFieldProps("totalProduction")}
          />
          {formik.touched.totalProduction && formik.errors.totalProduction ? (
            <div>{formik.errors.totalProduction}</div>
          ) : null}
        </div>
        <div className="my-2 flex flex-col">
          <label className="text-sm text-purple-1 py-1.5 font-semibold">
            QR Code Required
          </label>
          <input
            placeholder="QR Code Required"
            className="p-1.5 rounded-lg bg-purple-1 bg-opacity-10 border-2 border-purple-1"
            {...formik.getFieldProps("qrCodeRequired")}
          />
          {formik.touched.qrCodeRequired && formik.errors.qrCodeRequired ? (
            <div>{formik.errors.qrCodeRequired}</div>
          ) : null}
        </div>
        <button
          type="submit"
          className="w-full py-1.5 my-3 bg-purple-1 border-2 border-purple-1 focus:outline-none hover:bg-green-1 rounded text-base text-white font-bold hover:text-purple-1 duration-500"
        >
          Save
        </button>
      </form>
    </div>
  );
};
