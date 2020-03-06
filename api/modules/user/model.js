"use strict";
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  hash: {
    type: String,
    required: true
  },
  token: {
    type: String,
    required: true
  },
  event: {
    type: String,
    required: true
  },
  admin: {
    type: Boolean,
    default: false
  }
});

UserSchema.set("timestamps", true);

const User = mongoose.model("User", UserSchema);

module.exports = User;
