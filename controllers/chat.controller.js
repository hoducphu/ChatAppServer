const asyncHandler = require("express-async-handler");
const chatService = require("../services/chat.service");

const getMessage = asyncHandler(async (req, res) => {
  const messages = await chatService.getMessage(req.params.roomId);

  res.status(200).json(messages);
});

const sendMessage = asyncHandler(async (req, res) => {
  const newMessage = await chatService.sendMessage(req.body, req.user.id);

  res.status(200).json(newMessage);
});

const sendFileMessage = asyncHandler(async (req, res) => {
  const result = await chatService.sendFileMessage(req, res);

  res.status(200).json(result);
});

module.exports = { getMessage, sendMessage, sendFileMessage };
