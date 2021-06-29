const env = {
  database: "FlightManagement",
  username: "halong",
  password: "Na+89-K-2",
  host: "localhost",
  port: "3306",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};

module.exports = env;
