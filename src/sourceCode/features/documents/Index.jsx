import { Button } from "antd";
import React from "react";

export const Documents = () => {
  const uplaodDocument = (docName) => {};
  return (
    <div className="mt-4 flex gap-4">
      <Button
        type="primary"
        onClick={() => uplaodDocument("Power Purchase Agreement")}
      >
        Power Purchase Agreement
      </Button>
      <Button type="primary">Energy Wheeling Agreement</Button>
    </div>
  );
};
