const mongoose = require("mongoose");
const { isLowercase } = require("validator");
const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      require: true,
      minlength: 4,
      maxlength: 30,
    },
    lasttName: {
      type: String,
    },
    emailId: {
      type: String,
      require: true,
      unique: true,
      Lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      require: true,
    },
    age: {
      type: Number,
      require: true,
    },
    gender: {
      type: String,
      validate(value) {
        if (!["male", "female", "other"].includes(value)) {
          throw new error("gender data is not valid");
        }
      },
    },
    skill: {
      type: [String],
    },
    about: {
      type: String,
      default: "this is default value of about",
    },
  },
  {
    Timestamp: "true",
  }
);
const User = mongoose.model("User", userSchema);
module.exports = User;
