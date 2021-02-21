const mongoose = require("mongoose");

const roleSchema = new mongoose.Schema(
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
