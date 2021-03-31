const { Router } = require("express");
const router = Router();
const { requireAuth } = require("../middlewares/authMiddleware");
const receiptController = require("../controllers/receiptController");

router.get("/", requireAuth, receiptController.getReceipts);
router.post("/", requireAuth, receiptController.createReceipt);
router.put("/:id", requireAuth, receiptController.updateReceiptById);
router.delete("/:id", requireAuth, receiptController.deleteReceiptById);

module.exports = router;
