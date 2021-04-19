const notificationService = require("../services/notificationService");

/* Controller for GET: /api/notifications */

exports.getNotificationsByUserId = async (req, res) => {
  const { _id: receiverId } = req.user;
  try {
    const notifications = await notificationService.getNotificationsByUserId(
      receiverId
    );
    return res.status(200).json({ notifications });
  } catch (err) {
    console.error(err);
    return res.status(400).json({});
  }
};

/* Controller for POST: /api/notifications */

exports.createNotification = async (req, res) => {
  const { model } = req.body;
  try {
    const notification = await notificationService.createNotification(model);
    return res.status(200).json({ notification });
  } catch (err) {
    console.error(err);
    return res.status(400).json({});
  }
};

/* Controller for PUT: /api/notifications/mark-all-as-read */
exports.markAllAsRead = async (_, res) => {
  try {
    await notificationService.markAllAsRead();
    return res.status(200).json({});
  } catch (err) {
    console.error(err);
    return res.status(400).json({});
  }
};
