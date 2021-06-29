import React from "react";
import { Link } from "react-router-dom";
import { Layout, Menu } from "antd";
import { DatabaseOutlined } from "@ant-design/icons";
const { Sider } = Layout;

const MenuItem = ({ collapsed }) => {
  return (
    <>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
          <Menu.Item key="1" icon={<DatabaseOutlined />}>
            <Link to="/flight">Flight Management</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<DatabaseOutlined />}>
            <Link to="/place">Place Management</Link>
          </Menu.Item>
          <Menu.Item key="3" icon={<DatabaseOutlined />}>
            <Link to="/airport">Airport Management</Link>
          </Menu.Item>
        </Menu>
      </Sider>
    </>
  );
};

export default MenuItem;
