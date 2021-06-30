const fs = require("fs");
const db = require("../config/db.config.js");
const Users = db.users;
const Sequelize = db.sequelize;
const { QueryTypes } = require("sequelize");

// Post
exports.create = async (req, res) => {
  await Users.create({
    id: req.body.id,
    fullName: req.body.fullName,
    gender: req.body.gender,
    email: req.body.email,
    phoneNumber: req.body.phoneNumber,
    accountId: req.body.accountId,
    status: req.body.status,
  }).then((users) => {
    // Send created to client
    res.send(users);
  });
};

// FETCH all
exports.findAll = (req, res) => {
  Users.findAll().then((user) => {
    // Send all to Client
    res.send(user);
  });
};

// // Find Id
exports.findById = (req, res) => {
  Users.findById(req.params.id).then((user) => {
    res.send(user);
  });
};

// // Update
exports.update = (req, res) => {
  const id = req.params.id;
  Users.update(
    {
      fullName: req.body.fullName,
      gender: req.body.gender,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      accountId: req.body.accountId,
      status: req.body.status,
    },
    { where: { id: req.params.id } }
  ).then(() => {
    res.status(200).send("updated successfully a Users with id = " + id);
  });
  // };
};

exports.delete = (req, res) => {
  const id = req.params.id;
  Users.destroy({
    where: { id: id },
  }).then(() => {
    res.status(200).send("deleted successfully a Users with id = " + id);
  });
};

exports.search = async (req, res) => {
  const { fullName, status } = req.body;
  const users = await Sequelize.query(
    fullName && (status !== 0 || status !== 1)
      ? `SELECT * FROM users
      WHERE (fullName = :fullName)`
      : fullName && (status !== 0 || status !== 1)
      ? `SELECT * FROM users
      WHERE (fullName = :fullName AND status = :status)`
      : `SELECT * FROM users
      WHERE (status = :status)`,
    {
      replacements: {
        fullName: fullName,
        status: status,
      },
      type: QueryTypes.SELECT,
    }
  );

  res.status(200).json(users);
};
