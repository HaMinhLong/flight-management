module.exports = (sequelize, Sequelize) => {
  const FlightTime = sequelize.define("flightTime", {
    id: {
      type: Sequelize.STRING,
      primaryKey: true,
      unique: true,
    },
    fromTo: {
      type: Sequelize.STRING,
    },
    status: {
      type: Sequelize.INTEGER,
    },
  });
  return FlightTime;
};
