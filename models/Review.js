const mongoose = require("mongoose");
const { Schema } = mongoose;

const reviewSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    objectId: {
      type: Schema.Types.ObjectId,
      refPath: "onModel",
    },
    onModel: {
      type: String,
      require: true,
      enum: ["User", "Experience"],
    },
    numOfStars: {
      type: Number,
      require: true,
    },
    content: {
      type: String,
      require: true,
      trim: true,
    },
  },
  { timestamps: true }
);

const Review = mongoose.model("review", reviewSchema);

module.exports = Review;
