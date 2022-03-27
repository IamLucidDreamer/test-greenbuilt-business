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

  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={() => setCollapsed(!collapsed)}
        style={{ backgroundColor: "#140035" }}
      >
        <img
          src={Logo}
          alt=""
          className={`mx-auto w-44 my-1.5 ${collapsed ? "hidden" : "block"}`}
        />
        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          style={{ backgroundColor: "#140035" }}
        >
          <Menu.Item
            key="1"
            icon={<DashboardOutlined style={{ fontSize: "18px" }} />}
            style={{ fontSize: "18px", display: "flex", color: "#fff" }}
            onClick={() => navigate("/business/dashboard")}
          >
            Dashboard
          </Menu.Item>
          <Menu.Item
            key="2"
            icon={<UnorderedListOutlined style={{ fontSize: "18px" }} />}
            style={{ fontSize: "18px", display: "flex", color: "#fff" }}
            onClick={() => navigate("/business/product")}
          >
            Products
          </Menu.Item>
          <Menu.Item
            key="3"
            icon={<QrcodeOutlined style={{ fontSize: "18px" }} />}
            style={{ fontSize: "18px", display: "flex", color: "#fff" }}
            onClick={() => navigate("/business/generateqr")}
          >
            Generate QR
          </Menu.Item>
          <Menu.Item
            key="4"
            icon={<FundProjectionScreenOutlined style={{ fontSize: "18px" }} />}
            style={{ fontSize: "18px", display: "flex", color: "#fff" }}
            onClick={() => navigate("/business/generationplan")}
          >
            Generation Plan
          </Menu.Item>
          <Menu.Item
            key="5"
            icon={<FormOutlined style={{ fontSize: "18px" }} />}
            style={{ fontSize: "18px", display: "flex", color: "#fff" }}
            onClick={() => navigate("/business/generationplan")}
          >
            Points Request
          </Menu.Item>
          <Menu.Item
            key="6"
            icon={<FileOutlined style={{ fontSize: "18px" }} />}
            style={{ fontSize: "18px", display: "flex", color: "#fff" }}
            onClick={() => navigate("/business/documents")}
          >
            Documents
          </Menu.Item>
          <Menu.Item
            key="7"
            icon={<HistoryOutlined style={{ fontSize: "18px" }} />}
            style={{ fontSize: "18px", display: "flex", color: "#fff" }}
            onClick={() => navigate("/business/history")}
          >
            History
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <HeaderElement />
        <Content style={{ margin: "0 16px" }}>
          {/* For Managing Component Change within the Nested Routes Outlet is used*/}
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
