import React from "react";
import { Route } from "react-router-dom";
import Flight from "../pages/Flight/List";
import Place from "../pages/Place/List";
import Airport from "../pages/Airport/List";
const AppRouter = () => {
  return (
    <>
      <Route path="/flight" component={Flight} />
      <Route path="/place" component={Place} />
      <Route path="/airport" component={Airport} />
    </>
  );
};

export default AppRouter;
