const { Router } = require("express");
const router = Router();
const paymentController = require("../controllers/paymentController");

router.post("/booking", paymentController.createBookingSession);
router.get("/booking/:id", paymentController.getBookingSession);

module.exports = router;
