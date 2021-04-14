const Receipt = require("../models/Receipt");

exports.getReceipts = async (filterObj, sortObj) => {
  return await Receipt.aggregate([
    { $match: filterObj },
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
        from: "activities",
        localField: "activityId",
        foreignField: "_id",
        as: "activity",
      },
    },
    { $unwind: "$activity" },
    {
      $lookup: {
        from: "users",
        localField: "hostId",
        foreignField: "_id",
        as: "host",
      },
    },
    { $unwind: "$host" },
    { $sort: sortObj },
  ]);
};

exports.createReceipt = async (model) => {
  return await Receipt.create(model);
};

exports.updateReceiptById = async (id, updatedProperties) => {
  return await Receipt.findByIdAndUpdate(id, updatedProperties, { new: true });
};

exports.deleteReceiptById = async (id) => {
  return await Receipt.findByIdAndDelete(id);
};
