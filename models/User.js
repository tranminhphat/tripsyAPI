const mongoose = require("mongoose");
const { isEmail } = require("validator");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true,
    validate: [isEmail, "Please enter an valid email"],
  },
  username: {
    type: String,
    required: [true, "Username is required"],
    minlength: [6, "Minimum username length is 6 characters"],
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minlength: [6, "Minimum password length is 6 characters"],
  },
});

const User = mongoose.model("user", userSchema);

module.exports = User;
