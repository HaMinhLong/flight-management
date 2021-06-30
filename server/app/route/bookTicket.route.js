module.exports = function (app) {
  const bookTicket = require("../controller/bookTicket.controller");

  // fetch all bookTicket
  app.get("/api/bookTicket", bookTicket.findAll);
  // fetch bookTicket by id
  app.get("/api/bookTicket/:id", bookTicket.findById);
  // create new bookTicket
  app.post("/api/bookTicket", bookTicket.create);
  // update bookTicket by id
  app.put("/api/bookTicket/:id", bookTicket.update);
  // delete bookTicket by id
  app.delete("/api/bookTicket/:id", bookTicket.delete);
  // search
  app.post("/api/bookTicket/search", bookTicket.search);
};
