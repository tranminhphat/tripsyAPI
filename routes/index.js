const { Router } = require("express");
const {
  requireAuth,
  checkCurrentUser,
} = require("../middlewares/authMiddleware");
const router = Router();

router.get("/me", checkCurrentUser, (req, res) => {});
router.get("/protectedroute", requireAuth, (_, res) =>
  res.send("access protected route")
);
router.use("/auth", require("./authRoutes"));
router.use("/users", require("./userRoutes"));

module.exports = router;
