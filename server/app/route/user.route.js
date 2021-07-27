module.exports = function (app) {
  const user = require("../controller/user.controller");

  // fetch all user
  app.get("/api/user", user.findAll);
  // fetch user by id
  app.get("/api/user/:id", user.findById);
  // create new user
  app.post("/api/user", user.create);
  // update user by id
  app.put("/api/user/:id", user.update);
  // delete user by id
  app.delete("/api/user/:id", user.delete);
  // search
  app.post("/api/user/search", user.search);
  //login
  app.post("/api/user/login", user.login);
  //register
  app.post("/api/user/register", user.register);
  // total
  app.post("/api/user/total", user.total);
};
