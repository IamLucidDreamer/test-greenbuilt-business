import React, { useState } from "react";
import { ConsumptionHistory } from "./components/ConsumptionHistory";
import { GenerationHistory } from "./components/GenerationHistory";
import { Button } from "antd";

export const History = () => {
  // Declaring the States Required for the Working of the Component
  const [show, setShow] = useState(1);

  return (
    <div className="">
      <div className="flex justify-around items-center mt-4">
        <Button type="primary" onClick={() => setShow(1)}>
          Generation History
        </Button>
        <Button type="primary" onClick={() => setShow(2)}>
          Consumption History
        </Button>
      </div>
      {show === 1 ? <GenerationHistory /> : <ConsumptionHistory />}
    </div>
  );
};
