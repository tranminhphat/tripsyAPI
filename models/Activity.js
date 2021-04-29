const mongoose = require("mongoose");
const { Schema } = mongoose;

const activitySchema = new Schema(
  {
    hostId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    experienceId: {
      type: Schema.Types.ObjectId,
      ref: "Experience",
    },
    listOfGuestId: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    date: {
      type: Object,
      default: null,
    },
    status: {
      type: String,
      default: "0",
    },
  },
  { timestamps: true }
);

const Activity = mongoose.model("activity", activitySchema);

module.exports = Activity;
