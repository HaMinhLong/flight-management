module.exports = function (app) {
  const flight = require("../controller/flight.controller");

  // fetch all flight
  app.get("/api/flight", flight.findAll);
  // fetch flight by id
  app.get("/api/flight/:id", flight.findById);
  // create new flight
  app.post("/api/flight", flight.create);
  // update flight by id
  app.put("/api/flight/:id", flight.update);
  // delete flight by id
  app.delete("/api/flight/:id", flight.delete);
  // search
  app.post("/api/flight/search", flight.search);
  // total
  app.post("/api/flight/total", flight.total);
  // total by place departure
  app.post("/api/flight/total/place-departure", flight.totalByPlaceDeparture);
  // total by place destination
  app.post(
    "/api/flight/total/place-destination",
    flight.totalByPlaceDestination
  );
  // total by type
  app.post("/api/flight/total/type", flight.totalByType);
  // total by airport
  app.post("/api/flight/total/airport", flight.totalByAirport);
};
