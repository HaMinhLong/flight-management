import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Flight from "../pages/Flight/List";
const AppRouter = () => {
  return (
    <>
      <Router>
        <Route path="/flight" component={Flight} />
      </Router>
    </>
  );
};

export default AppRouter;
