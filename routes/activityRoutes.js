const { Router } = require("express");
const router = Router();
const activityController = require("../controllers/activityController");

router.get("/", activityController.getActivities);
router.get("/:id", activityController.getActivityById);
router.post("/", activityController.createActivity);
router.put("/:id", activityController.updateActivityById);
router.delete("/:id", activityController.deleteActivityById);

module.exports = router;
