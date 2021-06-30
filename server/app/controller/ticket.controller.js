const fs = require("fs");
const db = require("../config/db.config.js");
const Tickets = db.tickets;
const Sequelize = db.sequelize;
const { QueryTypes } = require("sequelize");

// Post
exports.create = async (req, res) => {
  await Tickets.create({
    id: req.body.id,
    ticketCode: req.body.ticketCode,
    price: req.body.price,
    flightId: req.body.flightId,
    status: req.body.status,
  }).then((tickets) => {
    // Send created to client
    res.send(tickets);
  });
};

// FETCH all
exports.findAll = (req, res) => {
  Tickets.findAll().then((user) => {
    // Send all to Client
    res.send(user);
  });
};

// // Find Id
exports.findById = (req, res) => {
  Tickets.findById(req.params.id).then((user) => {
    res.send(user);
  });
};

// // Update
exports.update = (req, res) => {
  const id = req.params.id;
  Tickets.update(
    {
      ticketCode: req.body.ticketCode,
      price: req.body.price,
      flightId: req.body.flightId,
      status: req.body.status,
    },
    { where: { id: req.params.id } }
  ).then(() => {
    res.status(200).send("updated successfully a Tickets with id = " + id);
  });
  // };
};

exports.delete = (req, res) => {
  const id = req.params.id;
  Tickets.destroy({
    where: { id: id },
  }).then(() => {
    res.status(200).send("deleted successfully a Tickets with id = " + id);
  });
};

exports.search = async (req, res) => {
  const { fullName, status } = req.body;
  const tickets = await Sequelize.query(
    fullName && (status !== 0 || status !== 1)
      ? `SELECT * FROM tickets
      WHERE (fullName = :fullName)`
      : fullName && (status !== 0 || status !== 1)
      ? `SELECT * FROM tickets
      WHERE (fullName = :fullName AND status = :status)`
      : `SELECT * FROM tickets
      WHERE (status = :status)`,
    {
      replacements: {
        fullName: fullName,
        status: status,
      },
      type: QueryTypes.SELECT,
    }
  );

  res.status(200).json(tickets);
};

exports.total = async (req, res) => {
  const total = await Sequelize.query(
    `SELECT COUNT(id) AS total FROM tickets`,
    {
      type: QueryTypes.SELECT,
    }
  );

  res.status(200).json(total);
};
