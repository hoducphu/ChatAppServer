const roomModel = require("../model/room.model");
const userModel = require("../model/user.model");
const { ErrorHandle } = require("../utils/errorHandle");

const getUserRoom = async (id) => {
  try {
    let rooms = await roomModel
      .find({
        users: { $elemMatch: { $eq: id } },
      })
      .populate("admin", "-password")
      .populate("users", "-password")
      .populate("lastMessage")
      .sort({ updatedAt: -1 });

    if (!rooms) {
      throw new ErrorHandle(400, "Fail to load rooms");
    }

    rooms = await userModel.populate(rooms, {
      path: "lastMessage.sender",
      select: "-password",
    });

    return rooms;
  } catch (error) {
    throw new ErrorHandle(error.statusCode, error.message);
  }
};

const createRoom = async (req) => {
  if (!req.body.roomName) {
    throw new ErrorHandle(400, "Please input room name!");
  }

  let users = JSON.parse(req.body.users);
  users.unshift(req.user.id);

  try {
    const newRoom = await roomModel.create({
      roomName: req.body.roomName,
      admin: req.user,
      users: users,
    });

    if (!newRoom) {
      throw new ErrorHandle(400, "Failed to create new room!");
    }

    const createdRoom = await roomModel
      .findOne({ _id: newRoom._id })
      .populate("admin", "-password")
      .populate("users", "-password");

    return createdRoom;
  } catch (error) {
    throw new ErrorHandle(error.statusCode, error.message);
  }
};

const addUserToRoom = async (body) => {
  const { roomId, users } = body;

  const newUsers = JSON.parse(users);
  try {
    const addedUsers = await roomModel
      .findByIdAndUpdate(
        roomId,
        {
          $push: { users: newUsers },
        },
        {
          new: true,
        }
      )
      .populate("admin", "-password")
      .populate("users", "-password");

    if (!addedUsers) {
      throw new ErrorHandle(400, "Failed to add user!");
    }
    return addedUsers;
  } catch (error) {
    throw new ErrorHandle(error.statusCode, error.message);
  }
};

const removeUserFromRoom = async (roomId, userId) => {
  try {
    const deletedUser = await roomModel
      .findByIdAndUpdate(
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

    if (!deletedUser) {
      throw new ErrorHandle(400, "Cannot delete users!");
    }

    return deletedUser;
  } catch (error) {
    throw new ErrorHandle(error.statusCode, error.message);
  }
};

const renameRoom = async (roomId, roomName) => {
  try {
    const updatedRoom = await roomModel
      .findByIdAndUpdate(roomId, {
        roomName: roomName,
      })
      .populate("admin", "-password")
      .populate("users", "-password");

    if (!updatedRoom) {
      throw new ErrorHandle(400, "Failed to rename room, something happened!");
    }

    const result = await roomModel
      .findById(roomId)
      .populate("admin", "-password")
      .populate("users", "-password");
    return result;
  } catch (error) {
    throw new ErrorHandle(error.statusCode, error.message);
  }
};

module.exports = {
  getUserRoom,
  createRoom,
  addUserToRoom,
  removeUserFromRoom,
  renameRoom,
};
