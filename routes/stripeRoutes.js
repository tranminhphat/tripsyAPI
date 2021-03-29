const { Router } = require("express");
const router = Router();
const stripeController = require("../controllers/stripeController");

router.get("/accounts/:id", stripeController.getAccountById);
router.post("/accounts", stripeController.createAccount);
router.post("/accounts/:id/link", stripeController.createAccountLink);

router.get("/checkout-session/:id", stripeController.getCheckoutSessionById);
router.post("/checkout-session", stripeController.createCheckoutSession);

module.exports = router;
