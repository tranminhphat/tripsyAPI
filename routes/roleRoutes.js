const { Router } = require("express");
const router = Router();
const roleController = require("../controllers/roleController");
const { requireAuth } = require("../middlewares/authMiddleware");

router.get("/", requireAuth, roleController.getRoles);
router.get("/:id", requireAuth, roleController.getRoleById);
router.post("/", requireAuth, roleController.createRole);
router.put("/:id", requireAuth, roleController.updateRoleById);
router.delete("/:id", requireAuth, roleController.deleteRoleById);

module.exports = router;
