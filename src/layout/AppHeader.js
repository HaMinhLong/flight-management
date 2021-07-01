import React from "react";
import { Layout, Button, Popconfirm, Tooltip } from "antd";

import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
} from "@ant-design/icons";

const { Header } = Layout;

const AppHeader = ({ collapsed, toggleCollapsed }) => {
  const username = localStorage.getItem("username");
  const logOut = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("userId");
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
        <Tooltip placement="bottomRight" title={username || ""}>
          <Popconfirm
            title="Are you sure to log out?"
            onConfirm={logOut}
            okText="Logout"
            cancelText="No"
          >
            <Button shape="circle" icon={<UserOutlined />}></Button>
          </Popconfirm>
        </Tooltip>
      </Header>
    </>
  );
};

export default AppHeader;
