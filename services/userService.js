const mongoose = require("mongoose");
const User = mongoose.model("user");
const _ = require("lodash");
const axios = require("axios");

const roleService = require("./roleService");

exports.getUserById = (id) => {
  const _id = mongoose.Types.ObjectId(id);
  return User.findById(_id);
};

exports.createUser = async (model) => {
  const { avatarBase64 } = model;
  const role = await roleService.getRoleByRoleName("user");
  console.log(role);

  let userProperties = _.omit({ ...model, roleId: role._id }, ["avatarBase64"]);
  console.log(userProperties);
  const user = await User.create(userProperties);
  user.save();
  if (avatarBase64) {
    const { data } = await axios.post(
      "http://localhost:2004/api/upload/image",
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
