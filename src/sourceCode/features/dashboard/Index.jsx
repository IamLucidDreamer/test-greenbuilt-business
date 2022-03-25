import React, { useState } from "react";
import { Layout, Menu, Breadcrumb } from "antd";
import {
  DashboardOutlined,
  UnorderedListOutlined,
  QrcodeOutlined,
  FundProjectionScreenOutlined,
  FileOutlined,
  HistoryOutlined,
  UserOutlined,
} from "@ant-design/icons";

import Logo from "../../assets/logoGreenbuilt.png";
import { Outlet, useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import "./styles/index.css";
import { useSelector } from "react-redux";

const { Header, Content, Footer, Sider } = Layout;

export const Dashboard = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const [collapsed, setCollapsed] = useState(false);
  const [breadCrumbs, setBreadCrumbs] = useState("");
  const [menuKey, setMenuKey] = useState("");

  // const handleDashboardProps = (pageTitle, key) => {
  //   setBreadCrumbs(pageTitle);
  //   setMenuKey(key);
  // };

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
            icon={<FileOutlined style={{ fontSize: "18px" }} />}
            style={{ fontSize: "18px", display: "flex", color: "#fff" }}
            onClick={() => navigate("/business/documents")}
          >
            Documents
          </Menu.Item>
          <Menu.Item
            key="6"
            icon={<HistoryOutlined style={{ fontSize: "18px" }} />}
            style={{ fontSize: "18px", display: "flex", color: "#fff" }}
            onClick={() => navigate("/business/history")}
          >
            History
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header
          style={{
            paddingLeft: "25px",
            backgroundColor: "#140035",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <h1 className="text-white text-base m-0 font-bold">Dashboard</h1>
          <div className="flex items-center">
            <h1 className="text-white text-base pr-3 m-0 font-bold">
              {user.name}
            </h1>
            <div className="">
              <UserOutlined
                style={{
                  backgroundColor: "#fff",
                  fontSize: 28,
                  borderRadius: 14,
                }}
              />
            </div>
          </div>
        </Header>
        <Content style={{ margin: "0 16px" }}>
          {/* For Managing Component Change within the Nested Routes Outlet is used*/}
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
