// models/user.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// const session = require("express-session");
// const bcrypt = require("bcrypt");
// const passport = require("passport");
// const LocalStrategy = require("passport-local").Strategy;

const userSchema = new Schema(
  {
    username: String,
    password: String
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
