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
    },
    address: {
      type: String,
    },
    avatarUrl: {
      type: String,
      default: "",
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    isPayOutEnabled: {
      type: Boolean,
      default: false,
    },
    isPhoneVerified: {
      type: Boolean,
      default: false,
    },
    roleId: [
      {
        type: Schema.Types.ObjectId,
        ref: "Role",
      },
    ],
    profileId: {
      type: Schema.Types.ObjectId,
      ref: "Profile",
    },
    payoutAccountId: {
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
userSchema.statics.login = async function (username, password) {
  const user = await this.findOne({ username });
  if (user) {
    if (user.isEmailVerified) {
      const auth = await bcrypt.compare(password, user.password);
      if (auth) {
        return user;
      }
      throw new Error("Invalid password");
    }
    throw new Error("Email is not verified");
  }
  throw new Error("Invalid user");
};

const User = mongoose.model("user", userSchema);

module.exports = User;
