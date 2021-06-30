module.exports = (sequelize, Sequelize) => {
  const BookTicket = sequelize.define("bookTicket", {
    id: {
      type: Sequelize.STRING,
      primaryKey: true,
      unique: true,
    },
    status: {
      type: Sequelize.INTEGER,
    },
  });
  return BookTicket;
};
