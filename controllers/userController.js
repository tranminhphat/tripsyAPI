const userService = require("../services/userService");

exports.getUser = async (req, res) => {
  const { id } = req.params;

  const user = await userService.getUserById(id);

  if (!user) {
    return res.status(400).send();
  }

  return res.status(200).json({ user });
};
