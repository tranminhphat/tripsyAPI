const { Router } = require("express");
const router = Router();
const userController = require("../controllers/userController");

router.get("/:id", userController.getUser);

module.exports = router;
