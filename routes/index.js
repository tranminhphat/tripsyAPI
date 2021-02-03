const { Router } = require("express");
const { requireAuth } = require("../middlewares/authMiddleware");
const router = Router();

router.get("/", (_, res) => {
  res.send({ hi: "there" });
});
router.get("/protectedroute", requireAuth, (_, res) =>
  res.send("access protected route")
);
router.use("/auth", require("./authRoutes"));

module.exports = router;
