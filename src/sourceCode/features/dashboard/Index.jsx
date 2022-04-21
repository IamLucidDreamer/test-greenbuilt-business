import React, { useState } from "react";
import { Layout, Menu, Dropdown } from "antd";
import {
  DashboardOutlined,
  UnorderedListOutlined,
  QrcodeOutlined,
  FundProjectionScreenOutlined,
  FileOutlined,
  HistoryOutlined,
  FormOutlined,
} from "@ant-design/icons";

import Logo from "../../assets/logoGreenbuilt.png";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import "./styles/index.css";
import { HeaderElement } from "../components/layout/Header";

const { Content, Sider } = Layout;

export const Dashboard = () => {
  const navigate = useNavigate();

  const [collapsed, setCollapsed] = useState(true);

  return (
    <Layout style={{ minHeight: "100vh", backgroundColor: "#e1e1e1" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={() => setCollapsed(!collapsed)}
        style={{ backgroundColor: "#fff", boxShadow: "1px 1px 6px #c1c1c1", zIndex: 2 }}
      >
        <img
          src={Logo}
          alt=""
          className={`mx-auto my-1.5 duration-300 ${
            collapsed ? "w-0" : "w-44"
          }`}
        />
        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          style={{ backgroundColor: "#fff", marginTop: "10px" }}
        >
          <Menu.Item
            key="1"
            icon={<DashboardOutlined style={{ fontSize: "18px" }} />}
            style={{ fontSize: "18px", display: "flex", color: "#140035" }}
            onClick={() => navigate("/business/dashboard")}
          >
            Dashboard
          </Menu.Item>
          <Menu.Item
            key="2"
            icon={<UnorderedListOutlined style={{ fontSize: "18px" }} />}
            style={{ fontSize: "18px", display: "flex", color: "#140035" }}
            onClick={() => navigate("/business/product")}
          >
            Products
          </Menu.Item>
          <Menu.Item
            key="3"
            icon={<QrcodeOutlined style={{ fontSize: "18px" }} />}
            style={{ fontSize: "18px", display: "flex", color: "#140035" }}
            onClick={() => navigate("/business/generateqr")}
          >
            Generate QR
          </Menu.Item>
          <Menu.Item
            key="4"
            icon={<FundProjectionScreenOutlined style={{ fontSize: "18px" }} />}
            style={{ fontSize: "18px", display: "flex", color: "#140035" }}
            onClick={() => navigate("/business/generationplan")}
          >
            Generation Plan
          </Menu.Item>
          <Menu.Item
            key="5"
            icon={<FormOutlined style={{ fontSize: "18px" }} />}
            style={{ fontSize: "18px", display: "flex", color: "#140035" }}
            onClick={() => navigate("/business/actualconsumption")}
          >
            Actual Consumption
          </Menu.Item>
          <Menu.Item
            key="6"
            icon={<HistoryOutlined style={{ fontSize: "18px" }} />}
            style={{ fontSize: "18px", display: "flex", color: "#140035" }}
            onClick={() => navigate("/business/history")}
          >
            History
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <HeaderElement />
        <Content style={{ padding: "8px 24px", backgroundColor: "#f0f0f0" }}>
          {/* For Managing Component Change within the Nested Routes Outlet is used*/}
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
