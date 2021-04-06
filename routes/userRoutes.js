const { Router } = require("express");
const router = Router();
const userController = require("../controllers/userController");
const { requireAuth } = require("../middlewares/authMiddleware");

router.get("/me", requireAuth, userController.getCurrentUser);
router.get("/", userController.getUsers);
router.get("/:id", userController.getUserById);
router.put("/change-password", requireAuth, userController.changePassword);
router.put("/change-avatar", requireAuth, userController.changeAvatar);
router.put("/verify-id", requireAuth, userController.verifyIdentity);
router.put("/:id", requireAuth, userController.updateUserById);

module.exports = router;
