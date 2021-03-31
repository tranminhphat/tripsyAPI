const mongoose = require("mongoose");
const { Schema } = mongoose;

const profileSchema = new Schema(
  {
    introduction: {
      type: String,
      default: "",
    },
    savedExperiences: [
      {
        type: Schema.Types.ObjectId,
        ref: "Experience",
      },
    ],
  },
  { timestamps: true }
);

const Profile = mongoose.model("profile", profileSchema);

module.exports = Profile;
