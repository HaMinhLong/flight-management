const fs = require("fs");
const db = require("../config/db.config.js");
const Accounts = db.accounts;
const Sequelize = db.sequelize;
const { QueryTypes } = require("sequelize");

// Post
exports.create = async (req, res) => {
  await Accounts.create({
    id: req.body.id,
    username: req.body.username,
    password: req.body.password,
    status: req.body.status,
  }).then((accounts) => {
    // Send created to client
    res.send(accounts);
  });
};

// FETCH all
exports.findAll = (req, res) => {
  Accounts.findAll().then((user) => {
    // Send all to Client
    res.send(user);
  });
};

// // Find Id
exports.findById = (req, res) => {
  Accounts.findById(req.params.id).then((user) => {
    res.send(user);
  });
};

// // Update
exports.update = (req, res) => {
  const id = req.params.id;
  Accounts.update(
    {
      username: req.body.username,
      password: req.body.password,
      status: req.body.status,
    },
    { where: { id: req.params.id } }
  ).then(() => {
    res.status(200).send("updated successfully a Accounts with id = " + id);
  });
  // };
};

exports.delete = (req, res) => {
  const id = req.params.id;
  Accounts.destroy({
    where: { id: id },
  }).then(() => {
    res.status(200).send("deleted successfully a Accounts with id = " + id);
  });
};

exports.search = async (req, res) => {
  const { username, status } = req.body;
  const accounts = await Sequelize.query(
    username && (status !== 0 || status !== 1)
      ? `SELECT * FROM accounts
      WHERE (username = :username)`
      : username && (status !== 0 || status !== 1)
      ? `SELECT * FROM accounts
      WHERE (username = :username AND status = :status)`
      : `SELECT * FROM accounts
      WHERE (status = :status)`,
    {
      replacements: {
        username: username,
        status: status,
      },
      type: QueryTypes.SELECT,
    }
  );

  res.status(200).json(accounts);
};
