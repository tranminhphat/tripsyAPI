const User = require("../models/User");
const { errorsHandler } = require("../handlers/errorsHandler");

exports.login = (req, res) => {
  console.log(req.body);
  res.send("User login");
};

exports.register = async (req, res) => {
  const { email, username, password } = req.body;

  try {
    const user = await User.create({ email, username, password });
    res.status(201).json(user);
  } catch (err) {
    const errors = errorsHandler(err);
    res.status(400).json({ errors });
  }
};
