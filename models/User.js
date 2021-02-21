const mongoose = require("mongoose");
const { Schema } = mongoose;
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");
const userSchema = new Schema(
  {
    firstName: {
      type: String,
      require: [true, "Firstname is required"],
      trim: true,
    },
    lastName: {
      type: String,
      require: [true, "Lastname is required"],
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
    gender: {
      type: String,
      required: true,
    },
    dateOfBirth: {
      type: Date,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
      minlength: [10, "Invalid phone number"],
      maxlength: [10, "Invalid phone number"],
    },
    address: {
      type: String,
    },
    roleId: {
      type: Schema.Types.ObjectId,
      ref: "Role",
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    avatarUrl: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

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
    if (user.isVerified) {
      const auth = await bcrypt.compare(password, user.password);
      if (auth) {
        return user;
      }
      throw new Error("Invalid password");
    }
    throw new Error("Email is not verified");
  }
  throw new Error("Invalid email");
};

const User = mongoose.model("user", userSchema);

module.exports = User;
