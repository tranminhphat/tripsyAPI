const mongoose = require("mongoose");
const User = mongoose.model("user");

const _ = require("lodash");
const axios = require("axios");

exports.getUserById = (id) => {
  const _id = mongoose.Types.ObjectId(id);
  return User.findById(_id);
};

exports.createUser = async (model) => {
  const { avatarBase64 } = model;
  let userProperties = _.omit(model, ["avatarBase64"]);
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
