const mongoose = require("mongoose");
const { Schema } = mongoose;

const activitySchema = new Schema({
  hostId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  experienceId: {
    type: Schema.Types.ObjectId,
    ref: "Experience",
  },
  listOfGuestId: {
    type: Array,
    default: [],
  },
  date: {
    type: Object,
    default: null,
  },
});

const Activity = mongoose.model("activity", activitySchema);

module.exports = Activity;