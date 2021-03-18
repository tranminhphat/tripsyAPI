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
  const filterArray = JSON.parse(req.query.filter);
  const filterObject = serviceUtils.createFilteredUserObject(filterArray);

  try {
    const data = await userService.getUsers(filterObject);
    return res.status(200).send(data);
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

    let updatedProperties = { ...req.body };
    const { avatarUrl, password, idCard } = req.body;

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

    if (idCard) {
      const { data } = await axios.post(
        "http://localhost:2004/api/upload/idcard",
        {
          userId: id,
          idCard,
        }
      );
      if (data) {
        updatedProperties = { ...updatedProperties, isIdVerified: true };
      }
    }

    try {
      await userService.updateUserById(id, updatedProperties);
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
  } catch (err) {
    return res.status(400).json({
      error: {
        userMessage: "Người dùng không tồn tại",
        internalMessage: "User is not existed",
      },
    });
  }
};
