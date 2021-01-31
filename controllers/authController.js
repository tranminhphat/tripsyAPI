const User = require("../models/User");

exports.login = (req, res) => {
  console.log(req.body);
  res.send("User login");
};

exports.register = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.create({ username, password });
    res.status(201).json(user);
  } catch (err) {
    console.error(err);
    res.status(400).send("Error, user not created");
  }
};
