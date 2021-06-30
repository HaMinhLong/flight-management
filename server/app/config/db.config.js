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
db.airports = require("../model/airport.model")(sequelize, Sequelize);
db.flightTimes = require("../model/flightTime.model")(sequelize, Sequelize);
db.users = require("../model/user.model")(sequelize, Sequelize);
db.accounts = require("../model/account.model")(sequelize, Sequelize);
db.tickets = require("../model/ticket.model")(sequelize, Sequelize);
db.bookTickets = require("../model/bookTicket.model")(sequelize, Sequelize);

db.places.hasOne(db.airports);
db.airports.hasOne(db.flights);
db.flightTimes.hasOne(db.flights);
db.accounts.hasOne(db.users);
db.flights.hasOne(db.tickets);
db.tickets.hasOne(db.bookTickets);
db.users.hasMany(db.bookTickets);

module.exports = db;
