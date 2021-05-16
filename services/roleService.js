const Role = require("../models/Role");

exports.getRoles = async () => {
  return await Role.find();
};

exports.getRoleByRoleName = async (roleName) => {
  return await Role.findOne({ roleName }).exec();
};
