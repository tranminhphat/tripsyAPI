const userService = require("../services/userService");
const axios = require("axios");
const bcrypt = require("bcrypt");

/* Controller for GET: /api/users */

exports.getUsers = async (req, res) => {};

/* Controller for GET: /api/users/id */

exports.getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await userService.getUserById(id);

    if (!user) {
      return res.status(400).json({
        error: {
          userMessage: "Người dùng không tồn tại",
          internalMessage: "User is not existed",
        },
      });
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
  } catch (err) {
    return res.status(400).json({
      error: {
        userMessage: "Người dùng không tồn tại",
        internalMessage: "User is not existed",
      },
    });
  }
};

/* Controller for PUT: /api/users/id */

exports.updateUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await userService.getUserById(id);
    if (!user) {
      return res.status(400).json({
        error: {
          userMessage: "Người dùng không tồn tại",
          internalMessage: "User is not existed",
        },
      });
    }

    let updatedProperties = { ...req.body };
    const { avatarUrl, password } = req.body;

    if (avatarUrl) {
      const { data } = await axios.post(
        "http://localhost:2004/api/upload/image",
        {
          data: avatarUrl,
          userId: id,
        }
      );
      updatedProperties = { ...updatedProperties, avatarUrl: data.imageUrl };
    }

    if (password) {
      const salt = await bcrypt.genSalt();
      const newPassword = await bcrypt.hash(password, salt);
      updatedProperties = { ...updatedProperties, password: newPassword };
    }

    try {
      await userService.updateUserById(id, updatedProperties);
      return res.status(200).json({ userMessage: "Cập nhật thành công" });
    } catch (err) {
      return res.status(400).json({
        error: {
          userMesesage: "Cập nhật thất bại",
          internalMessage: "Updated fail",
        },
      });
    }
  } catch (err) {
    return res.status(400).json({
      error: {
        userMessage: "Người dùng không tồn tại",
        internalMessage: "User is not existed",
      },
    });
  }
};
