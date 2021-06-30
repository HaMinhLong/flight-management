module.exports = (sequelize, Sequelize) => {
  const Account = sequelize.define("account", {
    id: {
      type: Sequelize.STRING,
      primaryKey: true,
      unique: true,
    },
    username: {
      type: Sequelize.STRING,
    },
    password: {
      type: Sequelize.STRING,
    },
    status: {
      type: Sequelize.INTEGER,
    },
  });
  return Account;
};
