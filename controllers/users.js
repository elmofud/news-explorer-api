const bcrypt = require("bcryptjs");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;

const createUser = (req, res) => {
  const { name, email, password } = req.body;
  return bcrypt
    .hash(password, 10)
    .then((hashedPassword) =>
      User.create({ name, email, password: hashedPassword }),
    )
    .then((user) => {
      const userObject = user.toObject();
      delete userObject.password;
      return res.status(201).send({ data: userObject });
    })
    .catch((err) => res.status(500).send({ message: err.message }));
};

const login = (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).send({ message: "Email and password are required" });
  }
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });
      return res.send({ token });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

module.exports = { createUser, login };
