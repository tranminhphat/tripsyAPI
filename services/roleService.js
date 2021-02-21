const mongoose = require("mongoose");
const Role = mongoose.model("role");

exports.getRoleByRoleName = async (roleName) => {
  return await Role.findOne({ roleName }).exec();
};
