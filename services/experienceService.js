const Experience = require("../models/Experience");

const userService = require("./userService");

exports.createExperience = async (model) => {
  const { hostId } = model;
  const user = await userService.getUserById(hostId);

  if (!user) {
    return res.status(400).json({
      error: {
        userError: "Người dùng không tồn tại",
        internalError: "User is not existed",
      },
    });
  }

  return await Experience.create(model);
};
