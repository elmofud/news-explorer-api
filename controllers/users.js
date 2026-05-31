const bcrypt = require("bcryptjs");
const User = require("../models/user");

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

module.exports = { createUser };
