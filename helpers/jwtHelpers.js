const jwt = require("jsonwebtoken");
const { JWT_SECRET, EMAIL_SECRET } = require("../config/development");

exports.maxAge = 24 * 60 * 60;

exports.createToken = (id) => {
  return jwt.sign({ id }, JWT_SECRET, {
    expiresIn: this.maxAge,
  });
};

exports.createEmailToken = (id, callback) => {
  return jwt.sign(
    { id },
    EMAIL_SECRET,
    {
      expiresIn: this.maxAge,
    },
    callback
  );
};
