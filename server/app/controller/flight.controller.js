const fs = require("fs");
const db = require("../config/db.config.js");
const Flights = db.flights;
const Sequelize = db.sequelize;
const { QueryTypes } = require("sequelize");

// Post a Customer
exports.create = async (req, res) => {
  await Flights.create({
    id: req.body.id,
    flightCode: req.body.flightCode,
    type: req.body.type,
    placeDeparture: req.body.placeDeparture,
    placeDestination: req.body.placeDestination,
    status: req.body.status,
  }).then((flights) => {
    // Send created customer to client
    res.send(flights);
  });
};

// FETCH all Customers
exports.findAll = (req, res) => {
  Flights.findAll().then((flight) => {
    // Send all customers to Client
    res.send(flight);
  });
};

// // Find a Customer by Id
exports.findById = (req, res) => {
  Flights.findById(req.params.id).then((flight) => {
    res.send(flight);
  });
};

// // Update a Customer
exports.update = (req, res) => {
  const id = req.params.id;
  Flights.update(
    {
      flightCode: req.body.flightCode,
      type: req.body.type,
      placeDeparture: req.body.placeDeparture,
      placeDestination: req.body.placeDestination,
      status: req.body.status,
    },
    { where: { id: req.params.id } }
  ).then(() => {
    res.status(200).send("updated successfully a Flights with id = " + id);
  });
  // };
};

exports.delete = (req, res) => {
  const id = req.params.id;
  Flights.destroy({
    where: { id: id },
  }).then(() => {
    res.status(200).send("deleted successfully a Flights with id = " + id);
  });
};

exports.search = async (req, res) => {
  const { flightCode, type, placeDeparture, placeDestination } = req.body;
  const flights = await Sequelize.query(
    !flightCode && !type
      ? `SELECT * FROM flights
      WHERE (placeDeparture = :placeDeparture AND placeDestination = :placeDestination)`
      : flightCode && !type
      ? `SELECT * FROM flights
      WHERE (flightCode = :flightCode AND placeDeparture = :placeDeparture AND placeDestination = :placeDestination)`
      : !flightCode && type
      ? `SELECT * FROM flights
      WHERE (type = :type AND placeDeparture = :placeDeparture AND placeDestination = :placeDestination)`
      : `SELECT * FROM flights
      WHERE (flightCode = :flightCode AND type = :type AND placeDeparture = :placeDeparture AND placeDestination = :placeDestination)`,
    {
      replacements: {
        flightCode: flightCode,
        type: type,
        placeDeparture: placeDeparture,
        placeDestination: placeDestination,
      },
      type: QueryTypes.SELECT,
    }
  );

  res.status(200).json(flights);
};
