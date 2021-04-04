const { Router } = require("express");
const router = Router();
const { requireAuth } = require("../middlewares/authMiddleware");
const reviewController = require("../controllers/reviewController");

router.get("/", reviewController.getReviews);
router.get("/count", reviewController.countReviews);
router.post("/", requireAuth, reviewController.createReview);

module.exports = router;
