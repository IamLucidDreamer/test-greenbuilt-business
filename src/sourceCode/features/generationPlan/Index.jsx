import React, { useEffect, useReducer, useState } from "react";
import axios from "../../appConfig/httpHelper";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { Button } from "antd";

export const GenerationPlan = () => {
  const navigate = useNavigate();
  const token = JSON.parse(localStorage.getItem("jwt"));
  const user = useSelector((state) => state.user);

  // Declaring the States Required for the Working of the Component
  const [show, setShow] = useState(1);

  return (
    <div className="">
      <div className="flex justify-around items-center mt-4">
        <Button type="primary" onClick={() => setShow(1)}>
          Monthly Plan
        </Button>
        <Button type="primary" onClick={() => setShow(2)}>
          Product Plan
        </Button>
      </div>
      {show === 1 ? <></> : <></>}
    </div>
  );
};
