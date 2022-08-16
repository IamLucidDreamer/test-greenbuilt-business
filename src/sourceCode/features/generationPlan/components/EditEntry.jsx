import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "../../../appConfig/httpHelper";
import { toast } from "react-toastify";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";

export const EditEntry = (props) => {
  const token = JSON.parse(localStorage.getItem("jwt"));
  const sourceType = useSelector((state) => state.statics.sourceType);
  const [data, setData] = useState([]);

  useEffect(() => {
    const tempArray = [];
    props.data?.monthlyPlans.forEach((value, index) => {
      tempArray.push({
        ownCaptive: value.ownCaptive,
        id: value.id,
        sourceType: value.sourceType,
        groupCaptive: value.groupCaptive,
        thirdPartyPurchase: value.thirdPartyPurchase,
      });
    });
    setData([...tempArray]);
    console.log(data);
  }, []);

  const formik = useFormik({
    initialValues: {
      monthYear: `${props.data?.year}-${
        props.data?.month < 10 ? `0${props.data?.month}` : props.data?.month
      }`,
    },
    validationSchema: Yup.object({
      monthYear: Yup.date().required("Required"),
    }),
    onSubmit: (values) => {
      const date = Date.parse(values.monthYear);
      console.log(date);
      handleRequest(date, data);
    },
  });

  const handleRequest = (date, values) => {
    console.log(values);
    const data = {
      data: [...values],
      info: {
        date: new Date().getDate(),
        year: new Date(date).getFullYear(),
        month: new Date(date).getMonth() + 1,
      },
    };
    console.log({ ...data });
    axios
      .put(
        `/monthly-plan/consumption/update`,
        { ...data },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        toast.success(res.data.message);
        props.back();
        props.requestsCaller();
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.error);
      });
  };

  return (
    <form onSubmit={formik.handleSubmit} className="my-2">
      <button
        className="text-purple-1 p-2 text-base"
        onClick={() => {
          props.back();
        }}
      >
        <ArrowLeftOutlined style={{ fontSize: 22 }} />
      </button>
      <h1 className="text-purple-1 text-center text-3xl font-bold">
        Edit Entry
      </h1>
      <div className="flex flex-col items-center justify-evenly mb-10">
        <h1 className="text-xl text-purple-1">Choose the Month</h1>
        <input
          {...formik.getFieldProps("monthYear")}
          value={formik.values.monthYear}
          type={"month"}
          className="p-3 text-xl text-purple-1 rounded-xl border-2 border-purple-1 border-opacity-50 focus:outline-purple-11"
        />
        {formik.touched.monthYear && formik.errors.monthYear ? (
          <div> {formik.errors.monthYear}</div>
        ) : null}
      </div>
      <div className="flex flex-row items-center justify-between bg-gray-200 px-2">
        <div className="p-3 bg-gray-200 flex items-center justify-center w-56">
          <h1 className="text-purple-1 font-semibold m-0 text-lg">
            Source Type
          </h1>
        </div>
        <div className="p-3 bg-gray-200 flex items-center justify-center w-56">
          <h1 className="text-purple-1 font-semibold m-0 text-lg">
            Own Captive
          </h1>
        </div>
        <div className="p-3 bg-gray-200 flex items-center justify-center w-56">
          <h1 className="text-purple-1 font-semibold m-0 text-lg">
            Group Captive
          </h1>
        </div>
        <div className="p-3 bg-gray-200 flex items-center justify-center w-56">
          <h1 className="text-purple-1 font-semibold m-0 text-lg">
            Third Party Purchases
          </h1>
        </div>
        <div className="p-3 bg-gray-200 flex items-center justify-center w-56">
          <h1 className="text-purple-1 font-semibold m-0 text-lg">
            Total Consumption
          </h1>
        </div>
      </div>
      {props.data.monthlyPlans.map((sourceData, index) => {
        const total =
          parseInt(data[index]?.ownCaptive) +
          parseInt(data[index]?.groupCaptive) +
          parseInt(data[index]?.thirdPartyPurchase);
        return (
          <div
            className="flex flex-row items-center justify-between bg-gray-100 px-2 border-2 "
            key={sourceData.id}
          >
            <div className="p-1 bg-gray-100 flex items-center justify-center w-56 border-l-1">
              <h1 className="text-purple-1 font-semibold m-0 p-2">
                {sourceData?.sourceType}
              </h1>
            </div>
            <div className="p-1 bg-gray-100 flex items-center justify-center border-l-1">
              <input
                type="number"
                min="0"
                value={data[index]?.ownCaptive || 0}
                onChange={(e) => {
                  setData([
                    ...data.slice(0, index),
                    {
                      ...data[index],
                      ownCaptive: parseInt(e.target.value),
                      id: sourceData.id,
                      sourceType: sourceData.name,
                    },
                    ...data.slice(index + 1),
                  ]);
                }}
                placeholder="Enter Own Captive"
                className="text-purple-1 font-semibold m-0 p-2"
              />
            </div>
            <div className="p-1 bg-gray-100 flex items-center justify-center w-56 border-l-1">
              <input
                type="number"
                min="0"
                value={data[index]?.groupCaptive || 0}
                onChange={(e) =>
                  setData([
                    ...data.slice(0, index),
                    {
                      ...data[index],
                      groupCaptive: parseInt(e.target.value),
                    },
                    ...data.slice(index + 1),
                  ])
                }
                placeholder="Enter Group Captive"
                className="text-purple-1 font-semibold m-0 p-2"
              />
            </div>
            <div className="p-3 bg-gray-100 flex items-center justify-center w-56 border-l-1">
              <input
                type="number"
                min="0"
                value={data[index]?.thirdPartyPurchase || 0}
                onChange={(e) =>
                  setData([
                    ...data.slice(0, index),
                    {
                      ...data[index],
                      thirdPartyPurchase: parseInt(e.target.value),
                    },
                    ...data.slice(index + 1),
                  ])
                }
                placeholder="Enter Third Party Purchase"
                className="text-purple-1 font-semibold m-0 p-2"
              />
            </div>
            <div className="p-3 bg-gray-100 flex items-center justify-center w-56 border-l-1">
              <h1 className="text-purple-1 font-semibold m-0">
                {isNaN(total) ? "Total" : total}
              </h1>
            </div>
          </div>
        );
      })}
      <button
        type="submit"
        className="w-full py-3 px-6 my-5 bg-purple-1 border-2 border-purple-1 focus:outline-none rounded-2xl text-xl text-left text-white font-bold group duration-500 flex justify-evenly items-center hover:shadow-lg shadow-purple-1"
      >
        Edit Entry
      </button>
    </form>
  );
};
