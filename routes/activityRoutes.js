const { Router } = require("express");
const router = Router();
const { requireAuth } = require("../middlewares/authMiddleware");
const activityController = require("../controllers/activityController");

router.get("/", requireAuth, activityController.getActivities);
router.get("/:id", requireAuth, activityController.getActivityById);
router.post("/", requireAuth, activityController.createActivity);
router.put("/:id", requireAuth, activityController.updateActivityById);
router.put(
  "/:id/update-guestlist",
  requireAuth,
  activityController.updateListOfGuestId
);
router.delete("/:id", requireAuth, activityController.deleteActivityById);

module.exports = router;
