const User = require("../models/User");
const { errorsHandler } = require("../handlers/errorsHandler");
const jwt = require("jsonwebtoken");

const maxAge = 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, "tripsy@2021", {
    expiresIn: maxAge,
  });
};

exports.login = (req, res) => {
  console.log(req.body);
  res.send("User login");
};

exports.register = async (req, res) => {
  const { email, username, password } = req.body;

  try {
    const user = await User.create({ email, username, password });
    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(201).json(user);
  } catch (err) {
    const errors = errorsHandler(err);
    res.status(400).json({ errors });
  }
};
