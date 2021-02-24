const { Router } = require("express");
const router = Router();

router.use("/auth", require("./authRoutes"));
router.use("/users", require("./userRoutes"));
router.use("/upload", require("./uploadRoutes"));
router.use("/experiences", require("./experienceRoutes"));

module.exports = router;
