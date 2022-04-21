import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "../../../appConfig/httpHelper";
import { toast } from "react-toastify";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";

export function AddNewProduct(props) {
  const industryType = useSelector((state) => state.statics.industryType);
  const uom = useSelector((state) => state.statics.uom);
  const packagingType = useSelector((state) => state.statics.packagingType);

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
      industryType: Yup.string().required("Required"),
      uom: Yup.string().required("Required"),
      packagingType: Yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      handleCreateProduct(values);
    },
  });

  const handleCreateProduct = (values) => {
    const token = JSON.parse(localStorage.getItem("jwt"));
    const data = {};
    data.product = { ...values, points: parseFloat(values.points) };
    console.log(data);
    axios
      .post("/product/create", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        toast.success(res.data.message);
        props.back();
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
              <select
                className="p-3 text-xl text-purple-1 rounded-xl border-2 border-purple-1 border-opacity-50 focus:outline-purple-1"
                {...formik.getFieldProps("packagingType")}
              >
                <option disabled value="">
                  Select Packaging Type
                </option>
                {packagingType.map((data) => (
                  <option value={data.name}>{data.name}</option>
                ))}
              </select>
              {formik.touched.packagingType && formik.errors.packagingType ? (
                <div>{formik.errors.packagingType}</div>
              ) : null}
            </div>
            <div className="my-5 flex flex-col">
              <select
                className="p-3 text-xl text-purple-1 rounded-xl border-2 border-purple-1 border-opacity-50 focus:outline-purple-1"
                {...formik.getFieldProps("uom")}
              >
                <option disabled value="">
                  Select UOM
                </option>
                {uom.map((data) => (
                  <option value={data.name}>{data.name}</option>
                ))}
              </select>
              {formik.touched.uom && formik.errors.uom ? (
                <div>{formik.errors.uom}</div>
              ) : null}
            </div>
            <div className="my-5 flex flex-col">
              <select
                className="p-3 text-xl text-purple-1 rounded-xl border-2 border-purple-1 border-opacity-50 focus:outline-purple-1"
                {...formik.getFieldProps("industryType")}
              >
                <option disabled value="">
                  Select Industry Type
                </option>
                {industryType.map((data) => (
                  <option value={data.name}>{data.name}</option>
                ))}
              </select>
              {formik.touched.industryType && formik.errors.industryType ? (
                <div>{formik.errors.industryType}</div>
              ) : null}
            </div>
            <div className="my-5 flex flex-col">
              <input
                placeholder={`Units Required / ${formik.values.uom}`}
                className="p-3 text-xl text-purple-1 rounded-xl border-2 border-purple-1 border-opacity-50 focus:outline-purple-11"
                {...formik.getFieldProps("points")}
              />
              {formik.touched.points && formik.errors.points ? (
                <div>{formik.errors.points}</div>
              ) : null}
            </div>
            <div className="my-5 flex flex-col">
              <input
                placeholder="Photo"
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
