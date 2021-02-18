const userService = require("../services/userService");

/* Controller for GET: /api/users/id */

exports.getUser = async (req, res) => {
  const { id } = req.params;

  const user = await userService.getUserById(id);

  if (!user) {
    return res.status(400).send();
  }

  return res.status(200).json({
    _id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    username: user.username,
    email: user.email,
    gender: user.gender,
    dateOfBirth: user.dateOfBirth,
    phoneNumber: user.phoneNumber,
    address: user.address,
    avatarUrl: user.avatarUrl,
    isVerified: user.isVerified,
    createAt: user.createAt,
  });
};
