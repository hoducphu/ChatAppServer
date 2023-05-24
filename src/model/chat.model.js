const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const chatSchema = mongoose.Schema(
  {
    message: { type: String, trim: true },
    sender: {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
    room: {
      type: Schema.Types.ObjectId,
      ref: "rooms",
    },
    type: { type: String },
  },
  { timestamps: true }
);

const Chat = mongoose.model("messages", chatSchema);

module.exports = Chat;
