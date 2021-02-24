const mongoose = require("mongoose");
const { Schema } = mongoose;

const experienceSchema = new Schema(
  {
    hostId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

const Experience = mongoose.model("experience", experienceSchema);

module.exports = Experience;
