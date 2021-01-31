const { Router } = require("express");
const router = Router();

router.get("/", (_, res) => {
  res.send({ hi: "there" });
});

module.exports = router;
