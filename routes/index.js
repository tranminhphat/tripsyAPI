const { Router } = require("express");
const router = Router();

router.use("/auth", require("./authRoutes"));
router.use("/users", require("./userRoutes"));
router.use("/upload", require("./uploadRoutes"));
router.use("/experiences", require("./experienceRoutes"));
router.use("/seeds", require("./seedRoutes"));

module.exports = router;
