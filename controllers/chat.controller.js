const asyncHandler = require("express-async-handler");
const Chat = require("../model/chat.model");
const Room = require("../model/room.model");
const { uploadMessageTypeFile } = require("../utils/uploadFile");

const getMessage = asyncHandler(async (req, res) => {
  try {
    const messages = await Chat.find({ room: req.params.roomId })
      .populate("sender", "fullname image")
      .exec();
    res.status(200).json(messages.slice(-25));
  } catch (err) {
    res.status(400);
    throw new Error(err);
  }
});

const sendMessage = asyncHandler(async (req, res) => {
  const { message, userId, type, roomId } = req.body;

  if (!message || !roomId) {
    console.log("Invalid data passed into request");
    return res.sendStatus(400);
  }

  let chat = {
    message: message,
    sender: userId,
    room: roomId,
    type: type,
  };

  try {
    const msgReq = await Chat.create(chat);

    const newMessage = await Chat.findOne({ _id: msgReq._id })
      .populate("sender", "-password")
      .populate("room")
      .exec();

    await Room.findByIdAndUpdate(req.body.roomId, { lastMessage: msgReq });

    res.status(200).json(newMessage);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

const sendFileMessage = asyncHandler(async (req, res) => {
  try {
    await uploadMessageTypeFile(req, res);
    if (req.file) {
      return res.json({ success: true, url: req.file.path });
    } else {
      return res.json({ success: false });
    }
  } catch (err) {
    res.status(401);
    throw new Error("File does not exist!");
  }
});

module.exports = { getMessage, sendMessage, sendFileMessage };
