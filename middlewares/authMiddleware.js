const jwt = require("jsonwebtoken");

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

module.exports = { requireAuth };
