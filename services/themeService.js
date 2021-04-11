const Theme = require("../models/Theme");

exports.getThemeById = async (id) => {
  return await Theme.findById(id);
};

exports.getThemeByThemeTitle = async (title) => {
  return await Theme.find({ value: title });
};
