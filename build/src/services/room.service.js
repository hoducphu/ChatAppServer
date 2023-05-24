"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var roomModel = require("../model/room.model");
var userModel = require("../model/user.model");
var _require = require("../utils/errorHandle"),
  ErrorHandle = _require.ErrorHandle;
var getUserRoom = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(id) {
    var rooms;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return roomModel.find({
            users: {
              $elemMatch: {
                $eq: id
              }
            }
          }).populate("admin", "-password").populate("users", "-password").populate("lastMessage").sort({
            updatedAt: -1
          });
        case 3:
          rooms = _context.sent;
          if (rooms) {
            _context.next = 6;
            break;
          }
          throw new ErrorHandle(400, "Fail to load rooms");
        case 6:
          _context.next = 8;
          return userModel.populate(rooms, {
            path: "lastMessage.sender",
            select: "-password"
          });
        case 8:
          rooms = _context.sent;
          return _context.abrupt("return", rooms);
        case 12:
          _context.prev = 12;
          _context.t0 = _context["catch"](0);
          throw new ErrorHandle(_context.t0.statusCode, _context.t0.message);
        case 15:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 12]]);
  }));
  return function getUserRoom(_x) {
    return _ref.apply(this, arguments);
  };
}();
var createRoom = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req) {
    var users, newRoom, createdRoom;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          if (req.body.roomName) {
            _context2.next = 2;
            break;
          }
          throw new ErrorHandle(400, "Please input room name!");
        case 2:
          users = JSON.parse(req.body.users);
          users.unshift(req.user.id);
          _context2.prev = 4;
          _context2.next = 7;
          return roomModel.create({
            roomName: req.body.roomName,
            admin: req.user,
            users: users
          });
        case 7:
          newRoom = _context2.sent;
          if (newRoom) {
            _context2.next = 10;
            break;
          }
          throw new ErrorHandle(400, "Failed to create new room!");
        case 10:
          _context2.next = 12;
          return roomModel.findOne({
            _id: newRoom._id
          }).populate("admin", "-password").populate("users", "-password");
        case 12:
          createdRoom = _context2.sent;
          return _context2.abrupt("return", createdRoom);
        case 16:
          _context2.prev = 16;
          _context2.t0 = _context2["catch"](4);
          throw new ErrorHandle(_context2.t0.statusCode, _context2.t0.message);
        case 19:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[4, 16]]);
  }));
  return function createRoom(_x2) {
    return _ref2.apply(this, arguments);
  };
}();
var addUserToRoom = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(body) {
    var roomId, users, newUsers, addedUsers;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          roomId = body.roomId, users = body.users;
          newUsers = JSON.parse(users);
          _context3.prev = 2;
          _context3.next = 5;
          return roomModel.findByIdAndUpdate(roomId, {
            $push: {
              users: newUsers
            }
          }, {
            "new": true
          }).populate("admin", "-password").populate("users", "-password");
        case 5:
          addedUsers = _context3.sent;
          if (addedUsers) {
            _context3.next = 8;
            break;
          }
          throw new ErrorHandle(400, "Failed to add user!");
        case 8:
          return _context3.abrupt("return", addedUsers);
        case 11:
          _context3.prev = 11;
          _context3.t0 = _context3["catch"](2);
          throw new ErrorHandle(_context3.t0.statusCode, _context3.t0.message);
        case 14:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[2, 11]]);
  }));
  return function addUserToRoom(_x3) {
    return _ref3.apply(this, arguments);
  };
}();
var removeUserFromRoom = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(roomId, userId) {
    var deletedUser;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return roomModel.findByIdAndUpdate(roomId, {
            $pull: {
              users: userId
            }
          }, {
            "new": true
          }).populate("admin", "-password").populate("users", "-password");
        case 3:
          deletedUser = _context4.sent;
          if (deletedUser) {
            _context4.next = 6;
            break;
          }
          throw new ErrorHandle(400, "Cannot delete users!");
        case 6:
          return _context4.abrupt("return", deletedUser);
        case 9:
          _context4.prev = 9;
          _context4.t0 = _context4["catch"](0);
          throw new ErrorHandle(_context4.t0.statusCode, _context4.t0.message);
        case 12:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[0, 9]]);
  }));
  return function removeUserFromRoom(_x4, _x5) {
    return _ref4.apply(this, arguments);
  };
}();
var renameRoom = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(roomId, roomName) {
    var updatedRoom, result;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _context5.next = 3;
          return roomModel.findByIdAndUpdate(roomId, {
            roomName: roomName
          }).populate("admin", "-password").populate("users", "-password");
        case 3:
          updatedRoom = _context5.sent;
          if (updatedRoom) {
            _context5.next = 6;
            break;
          }
          throw new ErrorHandle(400, "Failed to rename room, something happened!");
        case 6:
          _context5.next = 8;
          return roomModel.findById(roomId).populate("admin", "-password").populate("users", "-password");
        case 8:
          result = _context5.sent;
          return _context5.abrupt("return", result);
        case 12:
          _context5.prev = 12;
          _context5.t0 = _context5["catch"](0);
          throw new ErrorHandle(_context5.t0.statusCode, _context5.t0.message);
        case 15:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[0, 12]]);
  }));
  return function renameRoom(_x6, _x7) {
    return _ref5.apply(this, arguments);
  };
}();
module.exports = {
  getUserRoom: getUserRoom,
  createRoom: createRoom,
  addUserToRoom: addUserToRoom,
  removeUserFromRoom: removeUserFromRoom,
  renameRoom: renameRoom
};