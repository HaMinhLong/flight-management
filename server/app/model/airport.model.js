module.exports = (sequelize, Sequelize) => {
  const Airport = sequelize.define("airport", {
    id: {
      type: Sequelize.STRING,
      primaryKey: true,
      unique: true,
    },
    name: {
      type: Sequelize.STRING,
    },
    status: {
      type: Sequelize.INTEGER,
    },
  });
  return Airport;
};
