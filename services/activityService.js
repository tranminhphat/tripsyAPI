const Activity = require("../models/Activity.js");

exports.getActivities = async (filterObj, sortObj) => {
  return await Activity.aggregate([{ $match: filterObj }, { $sort: sortObj }]);
};

exports.getActivityById = async (id) => {
  return await Activity.findById(id);
};

exports.createActivity = async (model) => {
  return await Activity.create(model);
};

exports.updateActivityById = async (id, updatedProperties) => {
  return await Activity.findByIdAndUpdate(id, updatedProperties, { new: true });
};

exports.updateListOfGuestId = async (id, currentUserId, operator) => {
  return await Activity.findByIdAndUpdate(
    id,
    {
      [operator]: { listOfGuestId: currentUserId },
    },
    { new: true }
  );
};

exports.deleteActivityById = async (id) => {
  return await Activity.findByIdAndDelete(id);
};
