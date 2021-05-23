const Theme = require("../models/Theme");

exports.getThemeById = async (id) => {
  return await Theme.findById(id);
};

exports.getThemeByThemeTitle = async (title) => {
  return await Theme.find({ value: title });
};

exports.getThemes = async () => {
  return await Theme.find();
};

exports.createTheme = async (model) => {
  return await Theme.create(model);
};

exports.updateThemeById = async (id, updatedProperties) => {
  return await Theme.findByIdAndUpdate(id, updatedProperties);
};

exports.deleteThemeById = async (id) => {
  return await Theme.findByIdAndDelete(id);
};
