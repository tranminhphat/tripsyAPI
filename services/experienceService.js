const Experience = require("../models/Experience");

exports.getExperiences = async (filterObj, sortObj) => {
  return await Experience.aggregate([
    { $match: filterObj },
    { $sort: sortObj },
  ]);
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

exports.updateGallery = async (id, photo) => {
  return await Experience.findOneAndUpdate(
    { _id: id, "photoGallery.type": photo.type },
    { ["$set"]: { "photoGallery.$.url": photo.url } },
    { new: true }
  );
};

exports.deleteExperienceById = async (id) => {
  return await Experience.findByIdAndDelete(id);
};
