const { Router } = require("express");
const router = Router();
const userController = require("../controllers/userController");
const { requireAuth } = require("../middlewares/authMiddleware");

router.get("/me", requireAuth, (req, res) => {
  const user = req.user;
  return res.status(200).json({ user });
});
router.get("/:id", userController.getUserById);
router.put("/:id", userController.updateUserById);

module.exports = router;
