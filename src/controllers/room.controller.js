const Room = require("../model/room.model");
const asyncHandler = require("express-async-handler");
const roomService = require("../services/room.service");

const getUserRoom = asyncHandler(async (req, res) => {
  const results = await roomService.getUserRoom(req.user._id);

  res.status(200).json(results);
});

const createRoom = asyncHandler(async (req, res) => {
  const newRoom = await roomService.createRoom(req);

  res.status(200).json(newRoom);
});

const addUserToRoom = asyncHandler(async (req, res) => {
  const addedUsers = await roomService.addUserToRoom(req.body);

  res.status(200).json(addedUsers);
});

const removeUserFromRoom = asyncHandler(async (req, res) => {
  const { roomId, userId } = req.body;

  const deletedUser = await roomService.removeUserFromRoom(roomId, userId);

  res.status(200).json(deletedUser);
});

const renameRoom = asyncHandler(async (req, res) => {
  const { roomId, roomName } = req.body;

  const renamedRoom = await roomService.renameRoom(roomId, roomName);

  res.status(200).json(renamedRoom);
});

module.exports = {
  getUserRoom,
  createRoom,
  addUserToRoom,
  removeUserFromRoom,
  renameRoom,
};
