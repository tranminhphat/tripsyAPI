const Experience = require("../models/Experience");

exports.getExperiences = async (filterObj) => {
  return await Experience.aggregate([{ $match: filterObj }]);
};

exports.createExperience = async (model) => {
  return await Experience.create(model);
};

exports.updateExperienceById = async (id, updatedProperties) => {
  return await Experience.findByIdAndUpdate(id, updatedProperties, {
    new: true,
  });
};
