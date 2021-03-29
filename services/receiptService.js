const Receipt = require("../models/Receipt");

exports.getReceipts = async (filterObj) => {
  return await Receipt.aggregate([{ $match: filterObj }]);
};

exports.createReceipt = async (model) => {
  return await Receipt.create(model);
};

exports.updateReceiptById = async (id, updatedProperties) => {
  return await Receipt.findByIdAndUpdate(id, updatedProperties, { new: true });
};

exports.deleteReceiptById = async (id) => {
  return await Receipt.findByIdAndDelete(id);
};
