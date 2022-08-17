const Room = require("../model/room.model");
const asyncHandler = require("express-async-handler");
const User = require("../model/user.model");

const getUserRoom = asyncHandler(async (req, res) => {
  try {
    Room.find({
      users: { $elemMatch: { $eq: req.user._id } },
    })
      .populate("admin", "-password")
      .populate("users", "-password")
      .populate("lastMessage")
      .sort({ updatedAt: -1 })
      .then(async (results) => {
        results = await User.populate(results, {
          path: "lastMessage.sender",
          select: "-password",
        });
        res.status(200).send(results);
      });
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

const createRoom = asyncHandler(async (req, res) => {
  if (!req.body.roomName) {
    return res.status(400).send({ message: "Please input room name" });
  }

  var users = [JSON.parse(req.body.users)];
  users.unshift(req.user);

  try {
    const newRoom = await Room.create({
      roomName: req.body.roomName,
      admin: req.user,
      users: users,
    });

    const createdRoom = await Room.findOne({ _id: newRoom._id })
      .populate("admin", "-password")
      .populate("users", "-password");
    res.status(200).json(createdRoom);
  } catch (err) {
    res.status(400).send("Failed to create new room!");
    throw new Error("Failed to create new room!");
  }
});

const addUserToRoom = asyncHandler(async (req, res) => {
  const { roomId } = req.body;

  var users = JSON.parse(req.body.users);

  const added = await Room.findByIdAndUpdate(
    roomId,
    {
      $push: { users: users },
    },
    {
      new: true,
    }
  )
    .populate("admin", "-password")
    .populate("users", "-password");

  if (!added) {
    res.status(404);
    throw new Error("Chat Not Found");
  } else {
    res.json(added);
  }
});

const removeUserFromRoom = asyncHandler(async (req, res) => {
  const { roomId, userId } = req.body;

  const deleted = await Room.findByIdAndUpdate(
    roomId,
    {
      $pull: { users: userId },
    },
    {
      new: true,
    }
  )
    .populate("admin", "-password")
    .populate("users", "-password");

  if (!deleted) {
    res.status(404);
    throw new Error("Chat Not Found");
  } else {
    res.json(deleted);
  }
});

const renameRoom = asyncHandler(async (req, res) => {
  const { roomId, roomName } = req.body;

  const updatedChat = await Room.findByIdAndUpdate(roomId, {
    roomName: roomName,
  })
    .populate("admin", "-password")
    .populate("users", "-password");

  if (!updatedChat) {
    res.status(404);
    throw new Error("Chat Not Found");
  } else {
    const result = await Room.findById(roomId);
    res.json(result);
  }
});

module.exports = {
  getUserRoom,
  createRoom,
  addUserToRoom,
  removeUserFromRoom,
  renameRoom,
};
