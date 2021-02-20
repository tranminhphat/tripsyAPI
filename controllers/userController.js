const userService = require("../services/userService");
const axios = require("axios");
const bcrypt = require("bcrypt");

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

/* Controller for PUT: /api/users/id */

exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const user = await userService.getUserById(id);

  if (!user) {
    return res.status(404).send();
  }
  let updatedUser = { ...user._doc, ...req.body };
  const { avatarUrl, password } = req.body;

  if (avatarUrl) {
    const { data } = await axios.post(
      "http://localhost:2004/api/upload/image",
      {
        data: avatarUrl,
        userId: id,
      }
    );
    updatedUser = { ...updatedUser, avatarUrl: data.imageUrl };
  }

  if (password) {
    const salt = await bcrypt.genSalt();
    const newPassword = await bcrypt.hash(password, salt);
    updatedUser = { ...updatedUser, password: newPassword };
  }

  try {
    await userService.updateUserById(id, updatedUser);
    return res.status(200).json({ message: "Update user successfully" });
  } catch (err) {
    console.error(err);
  }
};
