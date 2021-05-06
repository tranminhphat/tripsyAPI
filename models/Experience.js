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
    title: {
      type: String,
      default: "",
    },
    photoGallery: {
      type: Array,
      default: [
        { type: "cover", url: "" },
        { type: "host", url: "" },
        { type: "action", url: "" },
        { type: "details", url: "" },
        { type: "location", url: "" },
        { type: "miscellaneous1", url: "" },
        { type: "miscellaneous2", url: "" },
      ],
    },
    groupSize: {
      type: Number,
      default: 0,
    },
    duration: {
      type: Number,
      default: 0,
    },
    pricing: {
      type: Object,
      default: null,
    },
    bookingDate: {
      type: Number,
      default: 1,
    },
    review: {
      type: Object,
      default: {
        totalItems: 0,
        averageStars: 0,
      },
    },
  },
  { timestamps: true }
);

experienceSchema.index(
  { title: "text" },
  { default_language: "en", language_override: "en" }
);

const Experience = mongoose.model("experience", experienceSchema);

module.exports = Experience;
