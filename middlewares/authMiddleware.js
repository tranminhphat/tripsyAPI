const jwt = require("jsonwebtoken");
const User = require("../models/User");

/* Check jwt for route that require authentication */
const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;

  if (token) {
    jwt.verify(token, "tripsy@2021", (err, decodedToken) => {
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
    jwt.verify(token, "tripsy@2021", async (err, decodedToken) => {
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
    res.status(400).json({});
    next();
  }
};

module.exports = { requireAuth, checkCurrentUser };
