module.exports = function (app) {
  const airport = require("../controller/airport.controller");

  // fetch all airport
  app.get("/api/airport", airport.findAll);
  // fetch airport by id
  app.get("/api/airport/:id", airport.findById);
  // create new airport
  app.post("/api/airport", airport.create);
  // update airport by id
  app.put("/api/airport/:id", airport.update);
  // delete airport by id
  app.delete("/api/airport/:id", airport.delete);
  // search
  app.post("/api/airport/search", airport.search);
};
