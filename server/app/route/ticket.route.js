module.exports = function (app) {
  const ticket = require("../controller/ticket.controller");

  // fetch all ticket
  app.get("/api/ticket", ticket.findAll);
  // fetch ticket by id
  app.get("/api/ticket/:id", ticket.findById);
  // create new ticket
  app.post("/api/ticket", ticket.create);
  // update ticket by id
  app.put("/api/ticket/:id", ticket.update);
  // delete ticket by id
  app.delete("/api/ticket/:id", ticket.delete);
  // search
  app.post("/api/ticket/search", ticket.search);
  // total
  app.post("/api/ticket/total", ticket.total);
};
