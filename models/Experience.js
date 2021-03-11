const mongoose = require("mongoose");
const { Schema } = mongoose;

const experienceSchema = new Schema(
  {
    hostId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    theme: {
      type: String,
      trim: true,
      default: "",
    },
    location: {
      type: Object,
      default: null,
    },
    language: {
      type: String,
      trim: true,
      default: "",
    },
    description: {
      type: String,
      trim: true,
      default: "",
    },
    address: {
      type: Object,
      default: null,
    },
    hostProvisions: {
      type: Array,
      default: null,
    },
    guestBrings: {
      type: Array,
      default: null,
    },
  },
  { timestamps: true }
);

const Experience = mongoose.model("experience", experienceSchema);

module.exports = Experience;
