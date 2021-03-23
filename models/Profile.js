const mongoose = require("mongoose");
const { Schema } = mongoose;

const profileSchema = new Schema(
  {
    introduction: {
      type: String,
      default: "",
    },
    savedExperiences: {
      type: Array,
      default: null,
    },
  },
  { timestamps: true }
);

const Profile = mongoose.model("profile", profileSchema);

module.exports = Profile;
