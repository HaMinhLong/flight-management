import React from "react";
import { Link } from "react-router-dom";
import { Layout, Menu } from "antd";
const { Sider } = Layout;

const MenuItem = ({ collapsed }) => {
  const home = window.location.href === "http://localhost:3000/" ? true : false;
  return (
    <>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        collapsedWidth={50}
        collapsible={true}
      >
        <Menu theme="dark" mode="inline" defaultSelectedKeys={["0"]}>
          <Menu.Item key="0" icon={<i className="fas fa-chart-line"></i>}>
            <Link
              to="/"
              className="logo"
              style={{ display: "flex", alignItems: "center" }}
            >
              {/* <img
                src="https://findlogovector.com/wp-content/uploads/2018/07/professional-flight-management-pfm-logo-vector.png"
                alt="logo-page"
              /> */}
              Dashboard
            </Link>
          </Menu.Item>
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
          <Menu.Item key="6" icon={<i className="fas fa-money-bill-wave"></i>}>
            <Link to="/book-ticket">Book Ticket</Link>
          </Menu.Item>
          <Menu.Item key="7" icon={<i className="far fa-user-circle"></i>}>
            <Link to="/user">User Management</Link>
          </Menu.Item>
          <Menu.Item key="8" icon={<i className="far fa-user"></i>}>
            <Link to="/account">Account Management</Link>
          </Menu.Item>
        </Menu>
      </Sider>
    </>
  );
};

export default MenuItem;
