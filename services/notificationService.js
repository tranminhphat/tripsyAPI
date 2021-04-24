const mongoose = require("mongoose");
const Notification = require("../models/Notification");

exports.createNotification = async (model) => {
  return await Notification.create(model);
};

exports.getNotificationsByUserId = async (receiverId) => {
  return await Notification.aggregate([
    {
      $match: { receiverId: mongoose.Types.ObjectId(receiverId) },
    },
    {
      $sort: {
        createdAt: -1,
      },
    },
  ]);
};

exports.markAllAsRead = async () => {
  return await Notification.updateMany({ new: true }, { new: false });
};
