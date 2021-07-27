const fs = require("fs");
const db = require("../config/db.config.js");
const Users = db.users;
const Accounts = db.accounts;
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

exports.login = async (req, res) => {
  const { username, password } = req.body;
  const checkUsername = await Sequelize.query(
    `SELECT * FROM accounts AS A JOIN users AS U ON A.id = U.accountId WHERE A.username = :username AND A.status = '1'`,
    {
      replacements: {
        username: username,
      },
      type: QueryTypes.SELECT,
    }
  );
  const checkPassword = await Sequelize.query(
    `SELECT * FROM accounts AS A JOIN users AS U ON A.id = U.accountId WHERE A.username = :username AND A.password = :password`,
    {
      replacements: {
        username: username,
        password: password,
      },
      type: QueryTypes.SELECT,
    }
  );
  const users = !(checkUsername.length > 0)
    ? "User not found"
    : !(checkPassword.length > 0)
    ? "Password is wrong"
    : checkPassword;

  res.status(200).json(users);
};

exports.register = async (req, res) => {
  const {
    idUser,
    fullName,
    gender,
    email,
    phoneNumber,
    idAccount,
    username,
    password,
  } = req.body;

  const checkEmail = await Sequelize.query(
    `SELECT  email FROM users WHERE email = :email`,
    {
      replacements: {
        email: email,
      },
      type: QueryTypes.SELECT,
    }
  );
  const checkPhone = await Sequelize.query(
    `SELECT phoneNumber FROM users WHERE  phoneNumber = :phoneNumber`,
    {
      replacements: {
        phoneNumber: phoneNumber,
      },
      type: QueryTypes.SELECT,
    }
  );

  const checkUsername = await Sequelize.query(
    `SELECT username FROM accounts WHERE username = :username`,
    {
      replacements: {
        username: username,
      },
      type: QueryTypes.SELECT,
    }
  );

  !checkEmail.length > 0 && !checkPhone.length > 0 && !checkUsername.length > 0
    ? await Accounts.create({
        id: idAccount,
        username: username,
        password: password,
        status: 1,
      })
    : console.log("error");
  !checkEmail.length > 0 && !checkPhone.length > 0 && !checkUsername.length > 0
    ? await Users.create({
        id: idUser,
        fullName: fullName,
        gender: gender,
        email: email,
        phoneNumber: phoneNumber,
        accountId: idAccount,
        status: 1,
      })
    : console.log("error");

  console.log(checkEmail);
  console.log(checkPhone);

  const message =
    checkEmail && checkEmail.length > 0
      ? "Email already in use"
      : checkPhone && checkPhone.length > 0
      ? "Phone number already in use"
      : checkUsername && checkUsername.length > 0
      ? "Username already in use"
      : "Register Successfully";
  res.status(200).json(message);
};

exports.total = async (req, res) => {
  const total = await Sequelize.query(`SELECT COUNT(id) AS total FROM users`, {
    type: QueryTypes.SELECT,
  });

  res.status(200).json(total);
};
