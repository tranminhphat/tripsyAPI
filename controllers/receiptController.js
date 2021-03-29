const receiptService = require("../services/receiptService");

/* Controller for POST: /api/receipts */

exports.createReceipt = async (req, res) => {
  const { model } = req.body;
  try {
    const receipt = await receiptService.createReceipt(model);
    return res.status(201).send(receipt._id);
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      error: {
        userMessage: "Xảy ra lỗi khi tạo biên lai",
        internalMessage: "Error occur while creating receipt",
      },
    });
  }
};

/* Controller for PUT: /api/receipts/:id */

exports.updateReceiptById = async (req, res) => {
  const { id } = req.params;
  const updatedProperties = { ...req.body };

  try {
    const receipt = await receiptService.updateReceiptById(id, {
      ...updatedProperties,
    });
    return res.status(200).json({ receipt });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      error: {
        userMessage: "Lỗi trong khi cập nhật thông tin biên lai",
        internalMessage: "Error occur when updating receipt",
      },
    });
  }
};

/* Controller for DELETE: /api/receipts/:id */

exports.deleteReceiptById = async (req, res) => {
  const { id } = req.params;

  try {
    const response = await receiptService.deleteReceiptById(id);
    return res.status(200).send(response);
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      error: {
        userMessage: "Lỗi trong khi xóa biên lai",
        internalMessage: "Error occur when deleting receipt",
      },
    });
  }
};
