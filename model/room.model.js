const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const roomSchema = mongoose.Schema(
  {
    roomName: { type: String, trim: true },
    admin: {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
    users: [
      {
        type: Schema.Types.ObjectId,
        ref: "users",
      },
    ],
    lastMessage: {
      type: Schema.Types.ObjectId,
      ref: "messages",
    },
  },
  { timestamps: true }
);

const Room = mongoose.model("rooms", roomSchema);

module.exports = Room;
