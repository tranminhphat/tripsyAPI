const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { errorsHandler } = require("../handlers/errorsHandler");
const { maxAge, createToken } = require("../helpers/jwtHelpers");
const { sendEmailVerification } = require("../helpers/sendVerificationEmail");
const { EMAIL_SECRET } = require("../config/development");

/* Controller for POST: /api/auth/login */
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    res.cookie("jwt", token, { maxAge: maxAge * 1000 });
    res.status(200).json({ userId: user._id });
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
    sendEmailVerification(user._id, user.email);
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

/* Controller for POST: /api/auth/resendEmailVerification */
exports.resendEmailVerification = async (req, res) => {
  const { userId, userEmail } = req.body;
  try {
    sendEmailVerification(userId, userEmail);
    res.status(200).send();
  } catch (err) {
    console.error(err);
    res.status(400).send();
  }
};

/* Controller for GET: /api/auth/verification/token */
exports.verification = async (req, res) => {
  try {
    const { id } = jwt.verify(req.params.token, EMAIL_SECRET);
    await User.updateOne({ _id: id }, { isVerified: true });
    res.status(200).send("Congrats, your email has been successfully verified");
  } catch (e) {
    console.error(e);
  }
};
