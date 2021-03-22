const { Router } = require("express");
const router = Router();
const paymentController = require("../controllers/paymentController");

router.post("/booking", paymentController.createBookingSession);

module.exports = router;
