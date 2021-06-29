module.exports = (sequelize, Sequelize) => {
  const Assigned = sequelize.define("flight", {
    id: {
      type: Sequelize.STRING,
      primaryKey: true,
      unique: true,
    },
    flightCode: {
      type: Sequelize.STRING,
    },
    type: {
      type: Sequelize.STRING,
    },
    placeDeparture: {
      type: Sequelize.STRING,
    },
    placeDestination: {
      type: Sequelize.STRING,
    },
    status: {
      type: Sequelize.INTEGER,
    },
  });
  return Assigned;
};
