const jwt = require("jsonwebtoken");
const User = require("../models/User");

/* Check jwt for route that require authentication */
const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;

  if (token) {
    jwt.verify(token, "tripsy@2021", (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.status(302).send("redirect to login page");
      } else {
        console.log(decodedToken);
        next();
      }
    });
  } else {
    res.status(302).send("redirect to login page");
  }
};

/* Check and send back the current user by jwt */
const checkCurrentUser = (req, res, next) => {
  const token = req.cookies.token;

  if (token) {
    jwt.verify(token, "tripsy@2021", (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.locals.user = null;
        next();
      } else {
        console.log(decodedToken);
        let user = User.findById(decodedToken.id);
        res.locals.user = user;
        next();
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
};

module.exports = { requireAuth, checkCurrentUser };
