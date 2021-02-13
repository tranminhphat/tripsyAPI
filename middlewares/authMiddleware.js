const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/development");
const User = require("../models/User");

/* Check jwt for route that require authentication */
const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;

  if (token) {
    jwt.verify(token, JWT_SECRET, (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.status(200).send("redirect to login page");
      } else {
        console.log(decodedToken);
        next();
      }
    });
  } else {
    res.status(200).send("redirect to login page");
  }
};

/* Check and send back the current user by jwt */
const checkCurrentUser = (req, res, next) => {
  const token = req.cookies.jwt;

  if (token) {
    jwt.verify(token, JWT_SECRET, async (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.status(400).json({ err });
        next();
      } else {
        let user = await User.findById(decodedToken.id);
        res.status(200).json({ user });
        next();
      }
    });
  } else {
    next();
  }
};

module.exports = { requireAuth, checkCurrentUser };
