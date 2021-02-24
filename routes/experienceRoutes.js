const { Router } = require("express");
const router = Router();
const experienceController = require("../controllers/experienceController");
const { requireAuth } = require("../middlewares/authMiddleware");

router.get("/", experienceController.getExperiences);
router.post("/", requireAuth, experienceController.createExperience);

module.exports = router;
