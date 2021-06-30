const fs = require("fs");
const db = require("../config/db.config.js");
const Places = db.places;
const Sequelize = db.sequelize;
const { QueryTypes } = require("sequelize");

// Post
exports.create = async (req, res) => {
  await Places.create({
    id: req.body.id,
    name: req.body.name,
    status: req.body.status,
  }).then((places) => {
    // Send created to client
    res.send(places);
  });
};

// FETCH all
exports.findAll = (req, res) => {
  Places.findAll().then((place) => {
    // Send all to Client
    res.send(place);
  });
};

// // Find Id
exports.findById = (req, res) => {
  Places.findById(req.params.id).then((place) => {
    res.send(place);
  });
};

// // Update
exports.update = (req, res) => {
  const id = req.params.id;
  Places.update(
    {
      name: req.body.name,
      status: req.body.status,
    },
    { where: { id: req.params.id } }
  ).then(() => {
    res.status(200).send("updated successfully a Places with id = " + id);
  });
  // };
};

exports.delete = (req, res) => {
  const id = req.params.id;
  Places.destroy({
    where: { id: id },
  }).then(() => {
    res.status(200).send("deleted successfully a Places with id = " + id);
  });
};

exports.search = async (req, res) => {
  const { name, status } = req.body;
  const places = await Sequelize.query(
    name && (status !== 0 || status !== 1)
      ? `SELECT * FROM places
      WHERE (name = :name)`
      : name && (status !== 0 || status !== 1)
      ? `SELECT * FROM places
      WHERE (name = :name AND status = :status)`
      : `SELECT * FROM places
      WHERE (status = :status)`,
    {
      replacements: {
        name: name,
        status: status,
      },
      type: QueryTypes.SELECT,
    }
  );

  res.status(200).json(places);
};

exports.total = async (req, res) => {
  const total = await Sequelize.query(`SELECT COUNT(id) AS total FROM places`, {
    type: QueryTypes.SELECT,
  });

  res.status(200).json(total);
};
