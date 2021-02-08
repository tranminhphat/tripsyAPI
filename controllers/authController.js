const User = require("../models/User");
const { errorsHandler } = require("../handlers/errorsHandler");
const { maxAge, createToken } = require("../helpers/jwtHelpers");

/* Controller for POST: /api/auth/login */
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    res.cookie("jwt", token, { maxAge: maxAge * 1000 });
    res.status(200).json({ user: user._id });
  } catch (err) {
    const errors = errorsHandler(err);
    res.status(400).json({ errors });
  }
};

/* Controller for POST: /api/auth/register */
exports.register = async (req, res) => {
  const { fullName, email, username, password } = req.body;

  try {
    const user = await User.create({ fullName, email, username, password });
    const token = createToken(user._id);
    res.cookie("jwt", token, { maxAge: maxAge * 1000 });
    res.status(201).json(user);
  } catch (err) {
    const errors = errorsHandler(err);
    res.status(400).json({ errors });
  }
};

/* Controller for GET: /api/auth/logout */
exports.logout = (_, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 1 });
    res.status(200).send("redirect to homepage");
  } catch (err) {
    const errors = errorsHandler(err);
    res.status(400).json({ errors });
  }
};
