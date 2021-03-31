const Profile = require("../models/Profile");

exports.getProfileById = async (id) => {
  return await Profile.findById(id);
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
