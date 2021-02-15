const jwt = require("jsonwebtoken");

exports.maxAge = 24 * 60 * 60;

exports.createToken = (
  id,
  secretKey,
  expireTime = this.maxAge,
  callback = undefined
) => {
  return jwt.sign(
    { id },
    secretKey,
    {
      expiresIn: expireTime,
    },
    callback
  );
};
