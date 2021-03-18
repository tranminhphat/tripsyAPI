const { Router } = require("express");
const router = Router();
const { requireAuth } = require("../middlewares/authMiddleware");
const profileController = require("../controllers/profileController");

router.get("/:id", requireAuth, profileController.getProfileById);
router.post("/", requireAuth, profileController.createProfile);
router.put("/:id", requireAuth, profileController.updateProfileById);

module.exports = router;
