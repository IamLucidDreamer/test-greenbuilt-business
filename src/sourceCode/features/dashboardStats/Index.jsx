import React, { useEffect, useState } from "react";
import StatsCard from "./components/StatsCard";
import { Button } from "antd";
import { ReloadOutlined } from "@ant-design/icons";
import axios from "../../appConfig/httpHelper";

export const DashboardStats = () => {
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState("");

  const dataLoader = () => {
    setLoading(true);
    const token = JSON.parse(localStorage.getItem("jwt"));
    console.log(token);
    axios
      .get(`/statistics/corporate/get-all`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setStats(res.data.data);
      })
      .catch((err) => console.log(err))
      .finally(setLoading(false));
  };

  useEffect(() => {
    dataLoader();
    console.log("Hello UseEffect");
  }, []);

  return (
    <div className="relative px-4 py-2">
      <div className="flex justify-end mr-10">
        <Button
          type="primary"
          loading={loading}
          onClick={() => dataLoader()}
          style={{ backgroundColor: "#140035" }}
        >
          <ReloadOutlined />
        </Button>
      </div>
      <div className="flex flex-wrap items-center justify-around">
        <StatsCard title={"Points"} stat={stats.availablePoints} icon={1} />
        <StatsCard
          title={"Total Products"}
          stat={stats.totalProducts}
          icon={2}
        />
        <StatsCard
          title={"Total QR's Generated"}
          stat={stats.totalQRGenerated}
          icon={3}
        />
        <StatsCard
          title={"Total QR's Consumed"}
          stat={stats.totalQRConsumed}
          icon={4}
        />
      </div>
    </div>
  );
};
