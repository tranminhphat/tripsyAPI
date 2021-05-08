const { Router } = require("express");
const router = Router();
const vonageController = require("../controllers/vonageController");
const { requireAuth } = require("../middlewares/authMiddleware");

router.post("/verify", requireAuth, vonageController.createVerify);
router.post("/verify/:token", requireAuth, vonageController.verifyToken);

module.exports = router;
