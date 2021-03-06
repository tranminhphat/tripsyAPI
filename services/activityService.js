const mongoose = require("mongoose");
const Activity = require("../models/Activity.js");

exports.getActivities = async (filterObj, sortObj) => {
  return await Activity.aggregate([
    {
      $lookup: {
        from: "experiences",
        localField: "experienceId",
        foreignField: "_id",
        as: "experience",
      },
    },
    { $unwind: "$experience" },
    { $match: filterObj },
    {
      $lookup: {
        from: "users",
        localField: "listOfGuestId",
        foreignField: "_id",
        as: "guestsInfo",
      },
    },
    { $sort: sortObj },
  ]);
};

exports.getActivityById = async (id) => {
  return (
    await Activity.aggregate([
      { $match: { _id: mongoose.Types.ObjectId(id) } },
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
        $lookup: {
          from: "users",
          localField: "listOfGuestId",
          foreignField: "_id",
          as: "guestsInfo",
        },
      },
    ])
  )[0];
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
