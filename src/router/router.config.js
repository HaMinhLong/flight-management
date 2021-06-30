import React from "react";
import { Route } from "react-router-dom";
import Flight from "../pages/Flight/List";
import Place from "../pages/Place/List";
import Airport from "../pages/Airport/List";
import FlightTime from "../pages/FlightTime/List";
import User from "../pages/User/List";
import Account from "../pages/Account/List";
import Ticket from "../pages/Ticket/List";
import BookTicket from "../pages/BookTicket/List";

const AppRouter = () => {
  return (
    <>
      <Route path="/flight" component={Flight} />
      <Route path="/place" component={Place} />
      <Route path="/airport" component={Airport} />
      <Route path="/time" component={FlightTime} />
      <Route path="/user" component={User} />
      <Route path="/account" component={Account} />
      <Route path="/ticket" component={Ticket} />
      <Route path="/book-ticket" component={BookTicket} />
    </>
  );
};

export default AppRouter;
