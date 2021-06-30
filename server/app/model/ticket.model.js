module.exports = (sequelize, Sequelize) => {
  const Ticket = sequelize.define("ticket", {
    id: {
      type: Sequelize.STRING,
      primaryKey: true,
      unique: true,
    },
    ticketCode: {
      type: Sequelize.STRING,
    },
    price: {
      type: Sequelize.INTEGER,
    },
    status: {
      type: Sequelize.INTEGER,
    },
  });
  return Ticket;
};
