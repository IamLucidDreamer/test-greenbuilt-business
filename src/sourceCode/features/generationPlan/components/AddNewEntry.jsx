import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "../../../appConfig/httpHelper";
import { toast } from "react-toastify";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";

export const AddNewEntry = (props) => {
  const token = JSON.parse(localStorage.getItem("jwt"));
  const sourceType = useSelector((state) => state.statics.sourceType);

  const [data, setData] = useState([]);

  const handleRequest = (data) => {
    axios
      .post(
        "/monthly-plan/consumption/create",
        { data },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        toast.success(res.data.message);
        props.back();
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="my-2">
      <button
        className="text-purple-1 p-2 text-base"
        onClick={() => {
          props.back();
        }}
      >
        <ArrowLeftOutlined style={{ fontSize: 22 }} />
      </button>
      <h1 className="text-purple-1 text-center text-3xl font-bold">
        Create New Entry
      </h1>
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
      {sourceType.map((sourceData, index) => {
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
                {sourceData?.name}
              </h1>
            </div>
            <div className="p-1 bg-gray-100 flex items-center justify-center border-l-1">
              <input
                onChange={(e) => {
                  setData([
                    ...data.slice(0, index),
                    {
                      ...data[index],
                      ownCaptive: parseInt(e.target.value),
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
                {isNaN(total) ? 0 : total}
              </h1>
            </div>
          </div>
        );
      })}
      <button
        onClick={() => handleRequest(data)}
        className="w-full py-3 px-6 my-5 bg-purple-1 border-2 border-purple-1 focus:outline-none rounded-2xl text-xl text-left text-white font-bold group duration-500 flex justify-evenly items-center hover:shadow-lg shadow-purple-1"
      >
        Add New Entry
      </button>
    </div>
  );
};
