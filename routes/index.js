const { Router } = require("express");
const router = Router();

router.get("/", (_, res) => {
  res.send({ hi: "there" });
});

router.use("/auth", require("./authRoutes"));

module.exports = router;
