const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/development");
const User = require("../models/User");

/* Check jwt for route that require authentication */
const requireAuth = (req, res, next) => {
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
        try {
          const user = await User.findById(decodedToken.id);
          res.status(200).json({ user });
          next();
        } catch (err) {
          res.status(400).json({
            error: {
              userMessage: "User không tồn tại",
              internalMessage: "User is not existed",
            },
          });
          next();
        }
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

module.exports = { requireAuth };
