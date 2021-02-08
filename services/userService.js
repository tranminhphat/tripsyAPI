const mongoose = require("mongoose");
const User = mongoose.model("user");

exports.getUserById = (id) => {
  const _id = mongoose.Types.ObjectId(id);
  return User.findById(_id);
};
