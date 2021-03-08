const Experience = require("../models/Experience");

exports.getExperiences = async (filterObj) => {
  return await Experience.aggregate([{ $match: filterObj }]);
};

exports.getExperienceById = async (id) => {
  return await Experience.findById(id);
};

exports.createExperience = async (model) => {
  return await Experience.create(model);
};

exports.updateExperienceById = async (id, updatedProperties) => {
  return await Experience.findByIdAndUpdate(id, updatedProperties, {
    new: true,
  });
};

exports.deleteExperienceById = async (id) => {
  return await Experience.findByIdAndDelete(id);
};
