const { Router } = require("express");
const router = Router();
const userController = require("../controllers/userController");
const { requireAuth } = require("../middlewares/authMiddleware");

router.get("/me", requireAuth, userController.getCurrentUser);
router.get("/", userController.getUsers);
router.get("/:id", userController.getUserById);
router.put("/:id", userController.updateUserById);

module.exports = router;
