const Profile = require("../models/Profile");
const mongoose = require("mongoose");

exports.getProfiles = async () => {
  return await Profile.aggregate([
    {
      $lookup: {
        from: "experiences",
        localField: "savedExperiences",
        foreignField: "_id",
        as: "savedExperiencesList",
      },
    },
  ]);
};

exports.getProfileById = async (id) => {
  return (
    await Profile.aggregate([
      { $match: { _id: mongoose.Types.ObjectId(id) } },
      {
        $lookup: {
          from: "experiences",
          localField: "savedExperiences",
          foreignField: "_id",
          as: "savedExperiencesList",
        },
      },
    ])
  )[0];
};

exports.createProfile = async (model) => {
  return await Profile.create(model);
};

exports.updateProfileById = async (id, updatedProperties) => {
  return await Profile.findByIdAndUpdate(id, updatedProperties, { new: true });
};

exports.savedExperience = async (id, experienceId, operator) => {
  return await Profile.findByIdAndUpdate(
    id,
    {
      [operator]: { savedExperiences: experienceId },
    },
    { new: true }
  );
};

exports.updateCheckpoints = async (id, themeId) => {
  return await Profile.findOneAndUpdate(
    {
      _id: id,
      "checkpoints.themeId": themeId,
    },
    {
      ["$inc"]: { "checkpoints.$.points": 10 },
    },
    { new: true }
  );
};
