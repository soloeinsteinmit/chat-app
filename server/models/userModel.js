const e = require("express");
const mongoose = require("mongoose");
/**
 * User schema
 */
const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, minlength: 3, maxlength: 30 },
    email: {
      type: String,
      required: true,
      unique: true,
      minlength: 5,
      maxlength: 200,
    },
    password: {
      type: String,
      required: true,
      unique: true,
      minlength: 5,
      maxlength: 1024,
    },
  },
  { timestamps: true }
);

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
