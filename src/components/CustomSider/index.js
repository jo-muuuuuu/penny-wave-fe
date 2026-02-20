import React, { Children } from "react";
import { useNavigate, useLocation } from "react-router";
import {
  DashboardOutlined,
  BookOutlined,
  DollarOutlined,
  BankOutlined,
  CreditCardOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";

import PennyWaveFontWhite from "../../assets/imgs/penny-wave-font-white.png";
import "./index.css";

const { Sider } = Layout;

const siderItems = [
  {
    key: "/",
    icon: React.createElement(DashboardOutlined),
    label: "Dashboard",
  },
  {
    key: "/account-book/overview",
    icon: React.createElement(BookOutlined),
    label: "Account Books",
  },
  {
    key: "/transaction/overview",
    icon: React.createElement(DollarOutlined),
    label: "Transactions",
  },
  {
    key: "/savings-plan/overview",
    icon: React.createElement(BankOutlined),
    label: "Savings Plans",
  },
  {
    icon: React.createElement(CreditCardOutlined),
    label: "Bills",
    children: [
      {
        key: "/bill/overview",
        label: "Regular Bills",
      },
      {
        key: "/recurring-bill/overview",
        label: "Recurring Bills",
      },
    ],
  },
  {
    key: "/profile",
    icon: React.createElement(UserOutlined),
    label: "Profile",
  },
];

const CustomSider = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const getSelectedKey = () => {
    const currentPath = location.pathname;

    if (currentPath.startsWith("/account-book")) {
      return "/account-book/overview";
    } else if (currentPath.startsWith("/transaction")) {
      return "/transaction/overview";
    } else if (currentPath.startsWith("/savings-plan")) {
      return "/savings-plan/overview";
    } else if (currentPath.startsWith("/bill")) {
      return "/bill/overview";
    } else if (currentPath.startsWith("/recurring-bill")) {
      return "/recurring-bill/overview";
    } else if (currentPath === "/profile") {
      return "/profile";
    }

    return "/";
  };

  const handleMenuClick = (route) => {
    navigate(route.key);
  };

  return (
    <Sider breakpoint="lg">
      <div className="demo-logo-vertical">
        {/* <img src={PennyWaveLogo} className="sider-logo" /> */}
        <img src={PennyWaveFontWhite} className="sider-font" />
        {/* <div className="sider-title">Penny Wave</div> */}
      </div>

      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["/"]}
        selectedKeys={[getSelectedKey()]}
        items={siderItems}
        onClick={handleMenuClick}
      />
    </Sider>
  );
};

export default CustomSider;
