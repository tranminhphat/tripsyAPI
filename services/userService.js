const mongoose = require("mongoose");
const User = require("../models/User");
const _ = require("lodash");
const axios = require("axios");
const roleService = require("./roleService");
const profileService = require("./profileService");

exports.getUsers = async (filterObj, sortObj) => {
  return await User.aggregate([{ $match: filterObj }, { $sort: sortObj }]);
};

exports.getUserById = (id) => {
  const _id = mongoose.Types.ObjectId(id);
  return User.findById(_id);
};

exports.createUser = async (model) => {
  const { avatarBase64, roles } = model;
  const role = await roleService.getRoleByRoleName("user");
  const profile = await profileService.createProfile();
  let userProperties = _.omit(
    { ...model, roleId: roles ? roles : [role._id], profileId: profile._id },
    ["avatarBase64"]
  );
  const user = await User.create(userProperties);

  if (avatarBase64) {
    const { data } = await axios.post(
      "http://localhost:2004/api/upload/avatar",
      {
        data: avatarBase64,
        userId: user._id,
      }
    );
    const avatarUrl = data.imageUrl;
    return this.updateUserById(user._id, { avatarUrl });
  }
  return user;
};

exports.updateUserById = (id, updatedProperties) => {
  return User.findByIdAndUpdate(id, updatedProperties, { new: true });
};

exports.deleteUserById = (id) => {
  return User.findByIdAndDelete(id);
};
