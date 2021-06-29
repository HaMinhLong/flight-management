module.exports = (sequelize, Sequelize) => {
  const Place = sequelize.define("place", {
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
  return Place;
};
