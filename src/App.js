import React, { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import AppRouter from "./router/router.config";
import MenuItem from "./layout/MenuItem";
import AppHeader from "./layout/AppHeader";
import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/SignUp";
import { Layout } from "antd";

const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  const isLogin = localStorage.getItem("username");
  return (
    <>
      <Router>
        {!isLogin ? (
          <>
            <Route exact path="/" component={Login} />
            <Route path="/register" component={SignUp} />
          </>
        ) : (
          <Layout id="components-layout-demo-custom-trigger">
            <MenuItem collapsed={collapsed} />
            <Layout className="site-layout">
              <AppHeader
                collapsed={collapsed}
                toggleCollapsed={toggleCollapsed}
              />
              <AppRouter />
            </Layout>
          </Layout>
        )}
      </Router>
    </>
  );
};

export default App;
