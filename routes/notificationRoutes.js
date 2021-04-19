const { Router } = require("express");
const router = Router();
const { requireAuth } = require("../middlewares/authMiddleware");
const notificationController = require("../controllers/notificationController");

router.get("/", requireAuth, notificationController.getNotificationsByUserId);
router.post("/", requireAuth, notificationController.createNotification);
router.put(
  "/mark-all-as-read",
  requireAuth,
  notificationController.markAllAsRead
);

module.exports = router;
