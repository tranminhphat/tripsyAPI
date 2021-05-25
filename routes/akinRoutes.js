const { Router } = require("express");
const router = Router();
const akinController = require("../controllers/akinController");
const { requireAuth } = require("../middlewares/authMiddleware");

router.get("/:id", requireAuth, akinController.getRecommendForUserId);
router.post("/add-log", requireAuth, akinController.addActivityLog);
router.post("/remove-log", requireAuth, akinController.removeActivityLog);

module.exports = router;
