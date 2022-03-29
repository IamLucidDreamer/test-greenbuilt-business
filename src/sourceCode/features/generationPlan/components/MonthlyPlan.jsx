import React from "react";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import axios from "../../../appConfig/httpHelper";
import * as Yup from "yup";

export const MonthlyPlan = () => {
  const formik = useFormik({
    initialValues: {
      sourceType: "",
      ownCaptive: "",
      groupCaptive: "",
      thirdPartyPurchase: "",
    },
    validationSchema: Yup.object({
      sourceType: Yup.string().required("Required"),
      ownCaptive: Yup.string().required("Required"),
      groupCaptive: Yup.string().required("Required"),
      thirdPartyPurchase: Yup.string().required("Required"),
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
      .post("/monthly-plan/consumption/create", data, {
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
      <h1 className="text-2xl text-purple-1 mt-2 font-bold">Monthly Plan</h1>
      <form className="" onSubmit={formik.handleSubmit}>
        <div className="my-2 flex flex-col">
          <label className="text-sm text-purple-1 py-1.5 font-semibold">
            Source Type
          </label>
          <input
            placeholder="Source Type"
            className="p-1.5 rounded-lg bg-purple-1 bg-opacity-10 border-2 border-purple-1"
            {...formik.getFieldProps("sourceType")}
          />
          {formik.touched.sourceType && formik.errors.sourceType ? (
            <div> {formik.errors.sourceType}</div>
          ) : null}
        </div>
        <div className="my-2 flex flex-col">
          <label className="text-sm text-purple-1 py-1.5 font-semibold">
            Own Captive
          </label>
          <input
            placeholder="Own Captive"
            className="p-1.5 rounded-lg bg-purple-1 bg-opacity-10 border-2 border-purple-1"
            {...formik.getFieldProps("ownCaptive")}
          />
          {formik.touched.ownCaptive && formik.errors.ownCaptive ? (
            <div>{formik.errors.ownCaptive}</div>
          ) : null}
        </div>
        <div className="my-2 flex flex-col">
          <label className="text-sm text-purple-1 py-1.5 font-semibold">
            Group Captive
          </label>
          <input
            placeholder="Group Captive"
            className="p-1.5 rounded-lg bg-purple-1 bg-opacity-10 border-2 border-purple-1"
            {...formik.getFieldProps("groupCaptive")}
          />
          {formik.touched.groupCaptive && formik.errors.groupCaptive ? (
            <div>{formik.errors.groupCaptive}</div>
          ) : null}
        </div>
        <div className="my-2 flex flex-col">
          <label className="text-sm text-purple-1 py-1.5 font-semibold">
            Third Party Purchases
          </label>
          <input
            placeholder="Third Party Purchases"
            className="p-1.5 rounded-lg bg-purple-1 bg-opacity-10 border-2 border-purple-1"
            {...formik.getFieldProps("thirdPartyPurchase")}
          />
          {formik.touched.thirdPartyPurchase &&
          formik.errors.thirdPartyPurchase ? (
            <div>{formik.errors.thirdPartyPurchase}</div>
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
