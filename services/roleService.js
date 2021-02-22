const Role = require("../models/Role");

exports.getRoleByRoleName = async (roleName) => {
  return await Role.findOne({ roleName }).exec();
};
