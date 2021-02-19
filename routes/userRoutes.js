const { Router } = require("express");
const router = Router();
const userController = require("../controllers/userController");

router.get("/:id", userController.getUser);
router.put("/:id", userController.updateUser);

module.exports = router;
