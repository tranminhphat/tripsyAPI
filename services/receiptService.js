const Receipt = require("../models/Receipt");

exports.createReceipt = async (model) => {
  return await Receipt.create(model);
};

exports.updateReceiptById = async (id, updatedProperties) => {
  return await Receipt.findByIdAndUpdate(id, updatedProperties, { new: true });
};
