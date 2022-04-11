import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "../../../appConfig/httpHelper";
import { toast } from "react-toastify";
import { ArrowLeftOutlined } from "@ant-design/icons";

export function AddNewProduct(props) {
  //Create Products Error With Points providing String in place of number
  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      points: "",
      photo: "",
      industryType: "",
      uom: "",
      packagingType: "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Required"),
      description: Yup.string().required("Required"),
      points: Yup.string().required("Required"),
      photo: Yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      values.points = 10;
      handleCreateProduct(values);
    },
  });

  const handleCreateProduct = (values) => {
    const token = JSON.parse(localStorage.getItem("jwt"));
    const data = {};
    data.product = { ...values };
    console.log(data);
    axios
      .post("/product/create", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        toast.success(res.data.message);
      })
      .catch((err) => {
        toast.error(err.response.data.erro);
      });
  };

  return (
    <div className="m-2">
      <button
        className="text-purple-1 p-2 text-base"
        onClick={() => {
          props.back();
        }}
      >
        <ArrowLeftOutlined style={{ fontSize: 22 }} />
      </button>
      <h1 className="text-purple-1 text-center text-3xl font-bold">
        Create New Product
      </h1>
      <div className="shadow-lg rounded-3xl">
        <div className="bg-white p-3 rounded-3xl">
          <form className="" onSubmit={formik.handleSubmit}>
            <div className="my-5 flex flex-col">
              <input
                placeholder="Title"
                className="p-3 text-xl text-purple-1 rounded-xl border-2 border-purple-1 border-opacity-50 focus:outline-purple-11"
                {...formik.getFieldProps("title")}
              />
              {formik.touched.title && formik.errors.title ? (
                <div>{formik.errors.title}</div>
              ) : null}
            </div>
            <div className="my-5 flex flex-col">
              <input
                placeholder="Description"
                className="p-3 text-xl text-purple-1 rounded-xl border-2 border-purple-1 border-opacity-50 focus:outline-purple-11"
                {...formik.getFieldProps("description")}
              />
              {formik.touched.description && formik.errors.description ? (
                <div>{formik.errors.description}</div>
              ) : null}
            </div>
            <div className="my-5 flex flex-col">
              <input
                placeholder="Points"
                className="p-3 text-xl text-purple-1 rounded-xl border-2 border-purple-1 border-opacity-50 focus:outline-purple-11"
                {...formik.getFieldProps("points")}
              />
              {formik.touched.points && formik.errors.points ? (
                <div>{formik.errors.points}</div>
              ) : null}
            </div>
            <div className="my-5 flex flex-col">
              <input
                placeholder="Packaging Type"
                className="p-3 text-xl text-purple-1 rounded-xl border-2 border-purple-1 border-opacity-50 focus:outline-purple-11"
                {...formik.getFieldProps("packagingType")}
              />
              {formik.touched.packagingType && formik.errors.packagingType ? (
                <div>{formik.errors.packagingType}</div>
              ) : null}
            </div>
            <div className="my-5 flex flex-col">
              <input
                placeholder="UOM"
                className="p-3 text-xl text-purple-1 rounded-xl border-2 border-purple-1 border-opacity-50 focus:outline-purple-11"
                {...formik.getFieldProps("uom")}
              />
              {formik.touched.uom && formik.errors.uom ? (
                <div>{formik.errors.uom}</div>
              ) : null}
            </div>
            <div className="my-5 flex flex-col">
              <input
                placeholder="Industry Type"
                className="p-3 text-xl text-purple-1 rounded-xl border-2 border-purple-1 border-opacity-50 focus:outline-purple-11"
                {...formik.getFieldProps("industryType")}
              />
              {formik.touched.industryType && formik.errors.industryType ? (
                <div>{formik.errors.industryType}</div>
              ) : null}
            </div>
            <div className="my-5 flex flex-col">
              <input
                placeholder="Points"
                className="p-3 text-xl text-purple-1 rounded-xl border-2 border-purple-1 border-opacity-50 focus:outline-purple-11"
                {...formik.getFieldProps("photo")}
              />
              {formik.touched.photo && formik.errors.photo ? (
                <div>{formik.errors.photo}</div>
              ) : null}
            </div>
            <button
              type="submit"
              className="w-full py-3 px-6 my-5 bg-purple-1 border-2 border-purple-1 focus:outline-none rounded-2xl text-xl text-left text-white font-bold group duration-500 flex justify-evenly items-center hover:shadow-lg shadow-purple-1"
            >
              Create Product
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
