const { Router } = require("express");
const router = Router();
const authController = require("../controllers/authController");

router.get("/", (_, res) => {
  res.send({ hi: "from auth" });
});

router.post("/login", authController.login);
router.post("/register", authController.register);
router.get("/logout", authController.logout);

module.exports = router;
