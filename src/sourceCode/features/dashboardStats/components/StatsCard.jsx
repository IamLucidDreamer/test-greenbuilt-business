import React from "react";
import {
  UserOutlined,
  QrcodeOutlined,
  DeploymentUnitOutlined,
  CameraOutlined,
} from "@ant-design/icons";

const StatsCard = (props) => {
  return (
    <div className="w-72 md:w-96 lg:w-128">
      <div className="relative flex flex-col min-w-0 break-words bg-white rounded-xl shadow-lg m-4 border-4 border-purple-1 px-3">
        <div className="flex-auto p-5">
          <div className="flex flex-wrap items-center justify-center sm:justify-between">
            <div className="relative w-full pr-4 max-w-full flex-grow flex-1 pb-4 sm:pb-0">
              <h5 className="text-purple-1 uppercase font-medium text-base md:text-xl ">
                {props.title}
              </h5>
              <span className="text-2xl md:text-3xl font-bold text-purple-1">
                {props.stat}
              </span>
            </div>
            <div
              className={
                "text-white p-3 text-center inline-flex items-center justify-center shadow-lg rounded-full bg-gradient-to-br from-[#4bc834] to-[#1e6100]"
              }
            >
              {props.icon === 1 ? (
                <UserOutlined style={{ fontSize: "40px" }} />
              ) : null}
              {props.icon === 2 ? (
                <DeploymentUnitOutlined style={{ fontSize: "40px" }} />
              ) : null}
              {props.icon === 3 ? (
                <QrcodeOutlined style={{ fontSize: "40px" }} />
              ) : null}
              {props.icon === 4 ? (
                <CameraOutlined style={{ fontSize: "40px" }} />
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsCard;
