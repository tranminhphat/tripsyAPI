const mongoose = require("mongoose");
const { Schema } = mongoose;

const roleSchema = new Schema(
  {
    roleName: {
      type: String,
      required: "Role name is required",
      unique: true,
      trim: true,
    },
  },
  { timestamps: true }
);

const Role = mongoose.model("role", roleSchema);

module.exports = Role;
