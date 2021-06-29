import React, { useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AppRouter from "./router/router.config";
import MenuItem from "./layout/MenuItem";
import AppHeader from "./layout/AppHeader";
import { Layout } from "antd";

const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  return (
    <>
      <Router>
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
      </Router>
    </>
  );
};

export default App;
