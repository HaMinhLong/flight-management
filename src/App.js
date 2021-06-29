import React, { useState } from "react";
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
      <Layout id="components-layout-demo-custom-trigger">
        <MenuItem collapsed={collapsed} />
        <Layout className="site-layout">
          <AppHeader collapsed={collapsed} toggleCollapsed={toggleCollapsed} />
          <AppRouter />
        </Layout>
      </Layout>
    </>
  );
};

export default App;
