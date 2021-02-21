const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/development");
const User = require("../models/User");

/* Check jwt for route that require authentication */
const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;

  if (token) {
    jwt.verify(token, JWT_SECRET, (err, decodedToken) => {
      if (err) {
        res.status(400).json({
          error: {
            userMessage: "Token không hợp lệ",
            internalMessage: "Invalid token",
          },
        });
        next();
      } else {
        res.status(200).json({ decodedToken });
        next();
      }
    });
  } else {
    res.status(400).json({
      error: {
        userMessage: "Token không tồn tại",
        internalMessage: "Token is not existed",
      },
    });
    next();
  }
};

/* Check and send back the current user by jwt */
const checkCurrentUser = (req, res, next) => {
  const token = req.cookies.jwt;

  if (token) {
    jwt.verify(token, JWT_SECRET, async (err, decodedToken) => {
      if (err) {
        res.status(400).json({
          error: {
            userMessage: "Token không hợp lệ",
            internalMessage: "Invalid token",
          },
        });
        next();
      } else {
        let user = await User.findById(decodedToken.id);
        res.status(200).json({ user });
        next();
      }
    });
  } else {
    res.status(400).json({
      error: {
        userMessage: "Token không tồn tại",
        internalMessage: "Token is not existed",
      },
    });
    next();
  }
};

module.exports = { requireAuth, checkCurrentUser };
