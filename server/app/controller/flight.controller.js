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
    airportId: req.body.airportId,
    flightTimeId: req.body.flightTimeId,
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
      airportId: req.body.airportId,
      flightTimeId: req.body.flightTimeId,
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

exports.total = async (req, res) => {
  const total = await Sequelize.query(
    `SELECT COUNT(id) AS total FROM flights`,
    {
      type: QueryTypes.SELECT,
    }
  );

  res.status(200).json(total);
};

exports.totalByPlaceDeparture = async (req, res) => {
  const totalByPlaceDeparture = await Sequelize.query(
    `SELECT placeDeparture as type,COUNT(placeDeparture) as value FROM flights GROUP BY placeDeparture`,
    {
      type: QueryTypes.SELECT,
    }
  );

  res.status(200).json(totalByPlaceDeparture);
};

exports.totalByPlaceDestination = async (req, res) => {
  const totalByPlaceDestination = await Sequelize.query(
    `SELECT placeDestination as type,COUNT(placeDestination) as value FROM flights GROUP BY placeDestination`,
    {
      type: QueryTypes.SELECT,
    }
  );

  res.status(200).json(totalByPlaceDestination);
};

exports.totalByType = async (req, res) => {
  const totalByType = await Sequelize.query(
    `SELECT type AS type,COUNT(type) AS value FROM flights GROUP BY type`,
    {
      type: QueryTypes.SELECT,
    }
  );

  res.status(200).json(totalByType);
};

exports.totalByAirport = async (req, res) => {
  const totalByAirport = await Sequelize.query(
    `SELECT name AS type, COUNT(name) AS value FROM flights as F JOIN airports AS A ON F.airportId = A.id GROUP BY name`,
    {
      type: QueryTypes.SELECT,
    }
  );

  res.status(200).json(totalByAirport);
};
