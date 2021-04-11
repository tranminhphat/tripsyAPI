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
    reviews: [
      {
        type: Schema.Types.ObjectId,
        ref: "Review",
      },
    ],
    checkpoints: [
      {
        type: Object,
        default: [
          { themeId: "6040f1eff1be2a20fc64352f", points: 0 },
          { themeId: "6040f4d76b4a1124acdd80c4", points: 0 },
          { themeId: "6040f4d86b4a1124acdd80c5", points: 0 },
          { themeId: "6040f4d86b4a1124acdd80c6", points: 0 },
          { themeId: "6040f4d86b4a1124acdd80c7", points: 0 },
          { themeId: "6040f4d96b4a1124acdd80c8", points: 0 },
          { themeId: "6040f4d96b4a1124acdd80c9", points: 0 },
          { themeId: "6040f4d96b4a1124acdd80ca", points: 0 },
          { themeId: "6040f4da6b4a1124acdd80cb", points: 0 },
          { themeId: "6040f4da6b4a1124acdd80cc", points: 0 },
          { themeId: "6040f4da6b4a1124acdd80cd", points: 0 },
        ],
      },
    ],
  },
  { timestamps: true }
);

const Profile = mongoose.model("profile", profileSchema);

module.exports = Profile;
