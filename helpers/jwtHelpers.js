const jwt = require("jsonwebtoken");

module.exports = {
  maxAge: 24 * 60 * 60,
  createToken: (id) => {
    return jwt.sign({ id }, "tripsy@2021", {
      expiresIn: this.maxAge,
    });
  },
};
