const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/development");
const User = require("../models/User");

/* Check jwt for route that require authentication */
const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;

  if (token) {
    jwt.verify(token, JWT_SECRET, async (err, decodedToken) => {
      if (err) {
        return res.status(400).json({
          error: {
            userMessage: "Token không hợp lệ",
            internalMessage: "Invalid token",
          },
        });
      } else {
        try {
          const user = await User.findById(decodedToken.id);
          req.user = user;
          next();
        } catch (err) {
          return res.status(400).json({
            error: {
              userMessage: "User không tồn tại",
              internalMessage: "User is not existed",
            },
          });
        }
      }
    });
  } else {
    return res.status(400).json({
      error: {
        userMessage: "Token không tồn tại",
        internalMessage: "Token is not existed",
      },
    });
  }
};

module.exports = { requireAuth };
