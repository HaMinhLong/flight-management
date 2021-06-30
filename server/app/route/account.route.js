module.exports = function (app) {
  const account = require("../controller/account.controller");

  // fetch all account
  app.get("/api/account", account.findAll);
  // fetch account by id
  app.get("/api/account/:id", account.findById);
  // create new account
  app.post("/api/account", account.create);
  // update account by id
  app.put("/api/account/:id", account.update);
  // delete account by id
  app.delete("/api/account/:id", account.delete);
  // search
  app.post("/api/account/search", account.search);
};
