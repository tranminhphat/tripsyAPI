const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    require: [true, "Fullname is required"],
    trim: true,
  },
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
  isVerified: {
    type: Boolean,
    default: false,
  },
  avatarUrl: {
    type: String,
    required: false,
    default: "",
  },
});

/* Hash user password before saved to database */
userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

/* Static method to login user */
userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw new Error("Invalid password");
  }
  throw new Error("Invalid email");
};

const User = mongoose.model("user", userSchema);

module.exports = User;
