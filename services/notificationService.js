const Notification = require("../models/Notification");

exports.createNotification = async (model) => {
  return await Notification.create(model);
};

exports.getNotificationsByUserId = async (receiverId) => {
  return await Notification.find({ receiverId });
};

exports.markAllAsRead = async () => {
  return await Notification.updateMany({ new: true }, { new: false });
};
