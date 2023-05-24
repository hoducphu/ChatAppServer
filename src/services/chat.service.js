const chatModel = require("../model/chat.model");
const roomModel = require("../model/room.model");
const { ErrorHandle } = require("../utils/errorHandle");
const { uploadMessageTypeFile } = require("../utils/uploadFile");

const getMessage = async (roomId) => {
  try {
    const messages = await chatModel
      .find({ room: roomId })
      .populate("sender", "fullname image")
      .exec();

    if (!messages) throw new ErrorHandle(400, "Cannot get message!");

    return messages.slice(-25);
  } catch (error) {
    throw new ErrorHandle(error.statusCode, error.message);
  }
};

const sendMessage = async (body, userId) => {
  const { message, type, roomId } = body;

  if (!message || !roomId) {
    throw new ErrorHandle(400, "Invalid data passed into request!");
  }

  let chat = {
    message: message,
    sender: userId,
    room: roomId,
    type: type,
  };

  try {
    const createMessage = await chatModel.create(chat);

    if (!createMessage) throw new ErrorHandle(400, "Fail to send message!");

    const newMessage = await chatModel
      .findOne({ _id: createMessage._id })
      .populate("sender", "-password")
      .populate("room")
      .exec();

    await roomModel.findByIdAndUpdate(roomId, { lastMessage: createMessage });

    return newMessage;
  } catch (error) {
    throw new ErrorHandle(error.statusCode, error.message);
  }
};

const sendFileMessage = async (req, res) => {
  try {
    await uploadMessageTypeFile(req, res);
    if (req.file) {
      return { success: true, url: req.file.path };
    } else {
      throw new ErrorHandle(400, "Invalid file!");
    }
  } catch (error) {
    throw new ErrorHandle(error.statusCode, error.message);
  }
};

module.exports = { getMessage, sendMessage, sendFileMessage };
