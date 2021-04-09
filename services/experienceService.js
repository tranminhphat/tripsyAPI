const Experience = require("../models/Experience");

const Activity = require("../models/Activity.js");

exports.getExperiencesByDate = async (dayOfYear) => {
  return await Activity.aggregate([
    { $match: { "date.dateObject.dayOfYear": Number(dayOfYear) } },
    {
      $lookup: {
        from: "experiences",
        localField: "experienceId",
        foreignField: "_id",
        as: "experience",
      },
    },
    { $unwind: "$experience" },
    {
      $project: {
        _id: 0,
        experience: 1,
      },
    },
  ]);
};

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
