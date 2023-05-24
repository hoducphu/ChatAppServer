"use strict";

var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var roomSchema = mongoose.Schema({
  roomName: {
    type: String,
    trim: true
  },
  admin: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  users: [{
    type: Schema.Types.ObjectId,
    ref: "users"
  }],
  lastMessage: {
    type: Schema.Types.ObjectId,
    ref: "messages"
  }
}, {
  timestamps: true
});
var Room = mongoose.model("rooms", roomSchema);
module.exports = Room;