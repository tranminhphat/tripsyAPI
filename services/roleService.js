const Role = require("../models/Role");

exports.getRoles = async () => {
  return await Role.find();
};

exports.getRoleById = async (id) => {
  return await Role.findById(id);
};

exports.getRoleByRoleName = async (roleName) => {
  return await Role.findOne({ roleName }).exec();
};

exports.createRole = async (model) => {
  return await Role.create(model);
};

exports.updateRoleById = async (id, updatedProperties) => {
  return await Role.findByIdAndUpdate(id, updatedProperties);
};

exports.deleteRoleById = async (id) => {
  return await Role.findByIdAndDelete(id);
};
