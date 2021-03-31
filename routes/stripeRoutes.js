const { Router } = require("express");
const router = Router();
const stripeController = require("../controllers/stripeController");
const { requireAuth } = require("../middlewares/authMiddleware");

router.get("/accounts/:id", stripeController.getAccountById);
router.post("/accounts", stripeController.createAccount);
router.post("/accounts/:id/link", stripeController.createAccountLink);

router.get("/checkout-session/:id", stripeController.getCheckoutSessionById);
router.post("/checkout-session", stripeController.createCheckoutSession);

router.get("/refunds/:id", stripeController.getRefundById);
router.post("/refunds", stripeController.createRefund);

router.post(
  "/transfers/:activityId",
  requireAuth,
  stripeController.createTransfer
);

module.exports = router;
