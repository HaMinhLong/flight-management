module.exports = function (app) {
  const flightTime = require("../controller/flightTime.controller");

  // fetch all flightTime
  app.get("/api/flightTime", flightTime.findAll);
  // fetch flightTime by id
  app.get("/api/flightTime/:id", flightTime.findById);
  // create new flightTime
  app.post("/api/flightTime", flightTime.create);
  // update flightTime by id
  app.put("/api/flightTime/:id", flightTime.update);
  // delete flightTime by id
  app.delete("/api/flightTime/:id", flightTime.delete);
  // search
  app.post("/api/flightTime/search", flightTime.search);
};
