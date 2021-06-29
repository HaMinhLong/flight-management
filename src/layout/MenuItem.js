import React from "react";
import { Layout, Menu, Typography } from "antd";
import { DatabaseOutlined } from "@ant-design/icons";
const { Sider } = Layout;
const { Link } = Typography;

const MenuItem = ({ collapsed }) => {
  return (
    <>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <a href="/" className="logo"></a>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
          <Menu.Item key="1" icon={<DatabaseOutlined />}>
            <Link href="/flight">Flight Management</Link>
          </Menu.Item>
        </Menu>
      </Sider>
    </>
  );
};

export default MenuItem;
