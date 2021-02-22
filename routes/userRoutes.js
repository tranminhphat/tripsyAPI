const { Router } = require("express");
const router = Router();
const userController = require("../controllers/userController");
const { requireAuth } = require("../middlewares/authMiddleware");

router.get("/me", requireAuth);

router.get("/:id", userController.getUser);
router.put("/:id", userController.updateUser);

module.exports = router;
