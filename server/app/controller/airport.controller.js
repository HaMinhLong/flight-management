const fs = require("fs");
const db = require("../config/db.config.js");
const Airport = db.airports;
const Sequelize = db.sequelize;
const { QueryTypes } = require("sequelize");

// Post
exports.create = async (req, res) => {
  await Airport.create({
    id: req.body.id,
    name: req.body.name,
    status: req.body.status,
    placeId: req.body.placeId,
  }).then((airport) => {
    // Send created to client
    res.send(airport);
  });
};

// FETCH all
exports.findAll = (req, res) => {
  Airport.findAll().then((airport) => {
    // Send all to Client
    res.send(airport);
  });
};

// // Find Id
exports.findById = (req, res) => {
  Airport.findById(req.params.id).then((airport) => {
    res.send(airport);
  });
};

// // Update
exports.update = (req, res) => {
  const id = req.params.id;
  Airport.update(
    {
      name: req.body.name,
      status: req.body.status,
      placeId: req.body.placeId,
    },
    { where: { id: req.params.id } }
  ).then(() => {
    res.status(200).send("updated successfully a Airport with id = " + id);
  });
  // };
};

exports.delete = (req, res) => {
  const id = req.params.id;
  Airport.destroy({
    where: { id: id },
  }).then(() => {
    res.status(200).send("deleted successfully a Airport with id = " + id);
  });
};

exports.search = async (req, res) => {
  const { name, status } = req.body;
  const airports = await Sequelize.query(
    name && (status !== 0 || status !== 1)
      ? `SELECT * FROM airports
      WHERE (name = :name)`
      : name && (status !== 0 || status !== 1)
      ? `SELECT * FROM airports
      WHERE (name = :name AND status = :status)`
      : `SELECT * FROM airports
      WHERE (status = :status)`,
    {
      replacements: {
        name: name,
        status: status,
      },
      type: QueryTypes.SELECT,
    }
  );

  res.status(200).json(airports);
};
