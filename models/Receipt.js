const mongoose = require("mongoose");
const { Schema } = mongoose;

const receiptSchema = new Schema({
  hostId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  experienceId: {
    type: Schema.Types.ObjectId,
    ref: "Experience",
  },
  activityId: {
    type: Schema.Types.ObjectId,
    ref: "Activity",
  },
  guestId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  checkOutSessionId: {
    type: String,
    default: "",
  },
  takePlace: {
    type: Object,
    default: null,
  },
  unitPrice: {
    type: Number,
  },
  numberOfGuest: {
    type: Number,
  },
  totalPrice: {
    type: Number,
  },
  status: {
    type: String,
    default: "unpaid",
  },
});

const Receipt = mongoose.model("receipt", receiptSchema);

module.exports = Receipt;
