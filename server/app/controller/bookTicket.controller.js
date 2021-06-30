const fs = require("fs");
const db = require("../config/db.config.js");
const BookTicket = db.bookTickets;
const Sequelize = db.sequelize;
const { QueryTypes } = require("sequelize");

// Post
exports.create = async (req, res) => {
  await BookTicket.create({
    id: req.body.id,
    userId: req.body.userId,
    ticketId: req.body.ticketId,
    status: req.body.status,
  }).then((bookTicket) => {
    // Send created to client
    res.send(bookTicket);
  });
};

// FETCH all
exports.findAll = (req, res) => {
  BookTicket.findAll().then((user) => {
    // Send all to Client
    res.send(user);
  });
};

// // Find Id
exports.findById = (req, res) => {
  BookTicket.findById(req.params.id).then((user) => {
    res.send(user);
  });
};

// // Update
exports.update = (req, res) => {
  const id = req.params.id;
  BookTicket.update(
    {
      userId: req.body.userId,
      ticketId: req.body.ticketId,
      status: req.body.status,
    },
    { where: { id: req.params.id } }
  ).then(() => {
    res.status(200).send("updated successfully a BookTicket with id = " + id);
  });
  // };
};

exports.delete = (req, res) => {
  const id = req.params.id;
  BookTicket.destroy({
    where: { id: id },
  }).then(() => {
    res.status(200).send("deleted successfully a BookTicket with id = " + id);
  });
};

exports.search = async (req, res) => {
  const { fullName, status } = req.body;
  const bookTicket = await Sequelize.query(
    fullName && (status !== 0 || status !== 1)
      ? `SELECT * FROM bookTicket
      WHERE (fullName = :fullName)`
      : fullName && (status !== 0 || status !== 1)
      ? `SELECT * FROM bookTicket
      WHERE (fullName = :fullName AND status = :status)`
      : `SELECT * FROM bookTicket
      WHERE (status = :status)`,
    {
      replacements: {
        fullName: fullName,
        status: status,
      },
      type: QueryTypes.SELECT,
    }
  );

  res.status(200).json(bookTicket);
};
