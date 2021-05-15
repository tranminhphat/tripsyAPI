const userService = require("../services/userService");
const serviceUtils = require("../utils/ServiceUtils");
const axios = require("axios");
const bcrypt = require("bcrypt");
const _ = require("lodash");

/* Controller for GET: /api/users/me */

exports.getCurrentUser = async (req, res) => {
  const { fields } = req.query;
  const user = req.user;

  if (fields) {
    const returnFields = serviceUtils.createReturnFields(user._doc, fields);
    return res.status(200).json({ user: returnFields });
  }

  return res.status(200).json({ user });
};

/* Controller for GET: /api/users */

exports.getUsers = async (req, res) => {
  const { filter, sort } = req.query;
  const filterObject = serviceUtils.createFilteredActivityObject(
    filter ? JSON.parse(filter) : null
  );
  const sortObject = serviceUtils.createSortObject(sort);

  try {
    const users = await userService.getUsers(filterObject, sortObject);
    return res.status(200).json({ users });
  } catch (err) {
    console.error(err);
    return res.status(400).json({
      error: {
        userMessage: "Không tải được dữ liệu",
        internalMessage: "Error occur when fetching data",
      },
    });
  }
};

/* Controller for GET: /api/users/id */

exports.getUserById = async (req, res) => {
  const { id } = req.params;
  const { fields } = req.query;
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

    if (fields) {
      const returnFields = serviceUtils.createReturnFields(user._doc, fields);
      return res.status(200).json({ user: returnFields });
    }

    return res.status(200).json(_.omit(user, ["password"]));
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

    try {
      const user = await userService.updateUserById(id, { ...req.body });
      return res.status(200).json({ user });
    } catch (err) {
      console.log(err);
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

/* Controller for PUT: /api/users/change-avatar */
exports.changeAvatar = async (req, res) => {
  const { _id: userId } = req.user;
  const { base64String } = req.body;

  try {
    const { data } = await axios.post(
      "http://localhost:2004/api/upload/avatar",
      {
        data: base64String,
        userId,
      }
    );
    if (data) {
      try {
        await userService.updateUserById(userId, { avatarUrl: data.imageUrl });
        return res.status(200).json({ userMessage: "Cập nhật thành công" });
      } catch (err) {
        console.log(err);
        return res.status(400).json({
          error: {
            userMesesage: "Cập nhật thất bại",
            internalMessage: "Updated fail",
          },
        });
      }
    }
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      error: {
        userMesesage: "Cập nhật thất bại",
        internalMessage: "Updated fail",
      },
    });
  }
};

/* Controller for PUT: /api/users/change-password */
exports.changePassword = async (req, res) => {
  const { _id: userId, password } = req.user;
  const { currentPassword, newPassword } = req.body;

  try {
    const isValid = await bcrypt.compare(currentPassword, password);
    if (!isValid) {
      return res.status(400).json({
        error: {
          userMessage: "Mật khẩu hiện tại không trùng khớp",
          internalMessage: "Incorrect current password",
        },
      });
    }

    const salt = await bcrypt.genSalt();
    const updatedPassword = await bcrypt.hash(newPassword, salt);
    await userService.updateUserById(userId, { password: updatedPassword });
    return res.status(200).send("Thay đổi mật khẩu thành công");
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      error: {
        userMesesage: "Cập nhật thất bại",
        internalMessage: "Updated fail",
      },
    });
  }
};

/* Controller for PUT: /api/users/verify-id */
exports.verifyIdentity = async (req, res) => {
  const { _id: userId } = req.user;
  const { idCard } = req.body;
  try {
    const { data } = await axios.post(
      "http://localhost:2004/api/upload/idcard",
      {
        userId,
        idCard,
      }
    );
    if (data) {
      try {
        await userService.updateUserById(userId, { isIdVerified: true });
        return res.status(200).json({ userMessage: "Cập nhật thành công" });
      } catch (err) {
        console.log(err);
        return res.status(400).json({
          error: {
            userMesesage: "Cập nhật thất bại",
            internalMessage: "Updated fail",
          },
        });
      }
    }
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      error: {
        userMesesage: "Cập nhật thất bại",
        internalMessage: "Updated fail",
      },
    });
  }
};

/* Controller for DELETE: /api/users/id */
exports.deleteUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await userService.deleteUserById(id);

    if (!user) {
      return res.status(400).json({
        error: {
          userMessage: "Người dùng không tồn tại",
          internalMessage: "User is not existed",
        },
      });
    }

    return res.status(200).json({ user });
  } catch (err) {
    return res.status(400).json({
      error: {
        userMessage: "Người dùng không tồn tại",
        internalMessage: "User is not existed",
      },
    });
  }
};
