const { Router } = require("express");
const router = Router();
const experienceController = require("../controllers/experienceController");
const { requireAuth } = require("../middlewares/authMiddleware");

router.get("/", experienceController.getExperiences);
router.get("/date/:dayOfYear", experienceController.getExperiencesByDate);
router.get("/:id", experienceController.getExperienceById);
router.get("/similar/:id", experienceController.getSimilarExperience);
router.get(
  "/recommend/:id",
  experienceController.getRecommendExperienceForUser
);
router.post("/", requireAuth, experienceController.createExperience);
router.put("/:id", requireAuth, experienceController.updateExperienceById);
router.put(
  "/:id/update-gallery",
  requireAuth,
  experienceController.updatePhotoGallery
);
router.delete("/:id", requireAuth, experienceController.deleteExperienceById);

module.exports = router;
