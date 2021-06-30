import React from "react";
import { Layout, Button, Popconfirm } from "antd";

import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
} from "@ant-design/icons";

const { Header } = Layout;

const AppHeader = ({ collapsed, toggleCollapsed }) => {
  const logOut = () => {
    localStorage.setItem("username", "");
    window.location = "/";
  };
  return (
    <>
      <Header className="site-layout-background">
        {React.createElement(
          collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
          {
            className: "trigger",
            onClick: toggleCollapsed,
          }
        )}
        <Popconfirm
          title="Are you sure to log out?"
          onConfirm={logOut}
          okText="Logout"
          cancelText="No"
        >
          <Button shape="circle" icon={<UserOutlined />}></Button>
        </Popconfirm>
      </Header>
    </>
  );
};

export default AppHeader;
