const { Router } = require("express");
const router = Router();
const experienceController = require("../controllers/experienceController");
const { requireAuth } = require("../middlewares/authMiddleware");

router.get("/", experienceController.getExperiences);
router.get("/:id", experienceController.getExperienceById);
router.post("/", requireAuth, experienceController.createExperience);
router.put("/:id", requireAuth, experienceController.updateExperienceById);
router.delete("/:id", requireAuth, experienceController.deleteExperienceById);

module.exports = router;
