import React from "react";
import { Link } from "react-router-dom";
import { Layout, Menu } from "antd";
const { Sider } = Layout;

const MenuItem = ({ collapsed }) => {
  return (
    <>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <Link to="/" className="logo" />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
          <Menu.Item key="1" icon={<i className="fas fa-plane"></i>}>
            <Link to="/flight">Flight Management</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<i className="fas fa-map-marked-alt"></i>}>
            <Link to="/place">Place Management</Link>
          </Menu.Item>
          <Menu.Item key="3" icon={<i className="fas fa-plane-arrival"></i>}>
            <Link to="/airport">Airport Management</Link>
          </Menu.Item>
          <Menu.Item key="4" icon={<i className="far fa-clock"></i>}>
            <Link to="/time">Flight Time Management</Link>
          </Menu.Item>
          <Menu.Item key="5" icon={<i className="fas fa-ticket-alt"></i>}>
            <Link to="/ticket">Ticket Management</Link>
          </Menu.Item>
          <Menu.Item key="6" icon={<i className="far fa-user-circle"></i>}>
            <Link to="/user">User Management</Link>
          </Menu.Item>
          <Menu.Item key="7" icon={<i className="far fa-user"></i>}>
            <Link to="/account">Account Management</Link>
          </Menu.Item>
        </Menu>
      </Sider>
    </>
  );
};

export default MenuItem;
