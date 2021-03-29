const { Router } = require("express");
const router = Router();
const receiptController = require("../controllers/receiptController");

router.get("/", receiptController.getReceipts);
router.post("/", receiptController.createReceipt);
router.put("/:id", receiptController.updateReceiptById);
router.delete("/:id", receiptController.deleteReceiptById);

module.exports = router;
