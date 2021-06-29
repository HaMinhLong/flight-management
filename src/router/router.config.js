import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Flight from "../pages/Flight/List";
import Place from "../pages/Place/List";
const AppRouter = () => {
  return (
    <>
      <Router>
        <Route path="/flight" component={Flight} />
        <Route path="/place" component={Place} />
      </Router>
    </>
  );
};

export default AppRouter;
