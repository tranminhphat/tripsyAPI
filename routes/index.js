const { Router } = require("express");
const router = Router();

router.use("/auth", require("./authRoutes"));
router.use("/users", require("./userRoutes"));
router.use("/upload", require("./uploadRoutes"));
router.use("/experiences", require("./experienceRoutes"));
router.use("/profiles", require("./profileRoutes"));
router.use("/payments", require("./paymentRoutes"));
router.use("/receipts", require("./receiptRoutes"));
router.use("/stripe", require("./stripeRoutes"));
router.use("/seeds", require("./seedRoutes"));

module.exports = router;
