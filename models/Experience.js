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
      default: {
        location: "",
        lat: "",
        lng: "",
      },
    },
    language: {
      type: String,
      trim: true,
      default: "",
    },
  },
  { timestamps: true }
);

const Experience = mongoose.model("experience", experienceSchema);

module.exports = Experience;
