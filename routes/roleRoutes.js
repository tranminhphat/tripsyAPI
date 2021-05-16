const { Router } = require("express");
const router = Router();
const roleController = require("../controllers/roleController");

router.get("/", roleController.getRoles);

module.exports = router;
