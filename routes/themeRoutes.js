const { Router } = require("express");
const router = Router();
const themeController = require("../controllers/themeController");
const { requireAuth } = require("../middlewares/authMiddleware");

router.get("/", themeController.getThemes);
router.get("/:id", themeController.getThemeById);
router.post("/", requireAuth, themeController.createTheme);
router.put("/:id", requireAuth, themeController.updateThemeById);
router.delete("/:id", requireAuth, themeController.deleteThemeById);

module.exports = router;
