const { Router } = require("express");
const router = Router();
const authController = require("../controllers/authController");

router.post("/login", authController.login);
router.post("/register", authController.register);
router.get("/logout", authController.logout);
router.get("/verification/:token", authController.verification);
router.post("/resendEmailVerification", authController.resendEmailVerification);

module.exports = router;
