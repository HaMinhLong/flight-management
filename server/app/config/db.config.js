const env = require("./env.js");

const { Sequelize, Op } = require("sequelize");
const sequelize = new Sequelize(env.database, env.username, env.password, {
  host: env.host,
  port: env.port,
  dialect: env.dialect,
  operatorsAliases: false,

  pool: {
    max: env.max,
    min: env.pool.min,
    acquire: env.pool.acquire,
    idle: env.pool.idle,
  },
});

const db = {};
db.Op = Op;
db.Sequelize = Sequelize;
db.sequelize = sequelize;

//Models/tables
db.flights = require("../model/flight.model.js")(sequelize, Sequelize);
db.places = require("../model/place.model")(sequelize, Sequelize);

module.exports = db;
