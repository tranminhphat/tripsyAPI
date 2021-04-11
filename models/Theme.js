const mongoose = require("mongoose");
const { Schema } = mongoose;

const themeSchema = new Schema(
  {
    value: {
      type: String,
      required: "Theme title is required",
      unique: true,
      trim: true,
    },
  },
  { timestamps: true }
);

const Theme = mongoose.model("theme", themeSchema);

module.exports = Theme;
