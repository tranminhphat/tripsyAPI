const jwt = require("jsonwebtoken");

exports.maxAge = 24 * 60 * 60;

exports.createToken = (id) => {
  return jwt.sign({ id }, "tripsy@2021", {
    expiresIn: this.maxAge,
  });
};
