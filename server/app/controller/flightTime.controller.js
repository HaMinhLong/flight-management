const fs = require("fs");
const db = require("../config/db.config.js");
const FlightTimes = db.flightTimes;
const Sequelize = db.sequelize;
const { QueryTypes } = require("sequelize");

// Post
exports.create = async (req, res) => {
  await FlightTimes.create({
    id: req.body.id,
    fromTo: req.body.fromTo,
    status: req.body.status,
  }).then((flightTimes) => {
    // Send created to client
    res.send(flightTimes);
  });
};

// FETCH all
exports.findAll = (req, res) => {
  FlightTimes.findAll().then((flightTime) => {
    // Send all to Client
    res.send(flightTime);
  });
};

// // Find Id
exports.findById = (req, res) => {
  FlightTimes.findById(req.params.id).then((flightTime) => {
    res.send(flightTime);
  });
};

// // Update
exports.update = (req, res) => {
  const id = req.params.id;
  FlightTimes.update(
    {
      fromTo: req.body.fromTo,
      status: req.body.status,
    },
    { where: { id: req.params.id } }
  ).then(() => {
    res.status(200).send("updated successfully a FlightTimes with id = " + id);
  });
  // };
};

exports.delete = (req, res) => {
  const id = req.params.id;
  FlightTimes.destroy({
    where: { id: id },
  }).then(() => {
    res.status(200).send("deleted successfully a FlightTimes with id = " + id);
  });
};

exports.search = async (req, res) => {
  const { fromTo, status } = req.body;
  const flightTimes = await Sequelize.query(
    fromTo && (status !== 0 || status !== 1)
      ? `SELECT * FROM flightTimes
      WHERE (fromTo = :fromTo)`
      : fromTo && (status !== 0 || status !== 1)
      ? `SELECT * FROM flightTimes
      WHERE (fromTo = :fromTo AND status = :status)`
      : `SELECT * FROM flightTimes
      WHERE (status = :status)`,
    {
      replacements: {
        fromTo: fromTo,
        status: status,
      },
      type: QueryTypes.SELECT,
    }
  );

  res.status(200).json(flightTimes);
};
