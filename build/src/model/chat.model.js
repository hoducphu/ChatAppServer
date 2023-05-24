"use strict";

var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var chatSchema = mongoose.Schema({
  message: {
    type: String,
    trim: true
  },
  sender: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  room: {
    type: Schema.Types.ObjectId,
    ref: "rooms"
  },
  type: {
    type: String
  }
}, {
  timestamps: true
});
var Chat = mongoose.model("messages", chatSchema);
module.exports = Chat;