module.exports = function (app) {
  const place = require("../controller/place.controller");

  // fetch all place
  app.get("/api/place", place.findAll);
  // fetch place by id
  app.get("/api/place/:id", place.findById);
  // create new place
  app.post("/api/place", place.create);
  // update place by id
  app.put("/api/place/:id", place.update);
  // delete place by id
  app.delete("/api/place/:id", place.delete);
  // search
  app.post("/api/place/search", place.search);
  // total
  app.post("/api/place/total", place.total);
};
