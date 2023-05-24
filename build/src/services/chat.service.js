"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var chatModel = require("../model/chat.model");
var roomModel = require("../model/room.model");
var _require = require("../utils/errorHandle"),
  ErrorHandle = _require.ErrorHandle;
var _require2 = require("../utils/uploadFile"),
  uploadMessageTypeFile = _require2.uploadMessageTypeFile;
var getMessage = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(roomId) {
    var messages;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return chatModel.find({
            room: roomId
          }).populate("sender", "fullname image").exec();
        case 3:
          messages = _context.sent;
          if (messages) {
            _context.next = 6;
            break;
          }
          throw new ErrorHandle(400, "Cannot get message!");
        case 6:
          return _context.abrupt("return", messages.slice(-25));
        case 9:
          _context.prev = 9;
          _context.t0 = _context["catch"](0);
          throw new ErrorHandle(_context.t0.statusCode, _context.t0.message);
        case 12:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 9]]);
  }));
  return function getMessage(_x) {
    return _ref.apply(this, arguments);
  };
}();
var sendMessage = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(body, userId) {
    var message, type, roomId, chat, createMessage, newMessage;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          message = body.message, type = body.type, roomId = body.roomId;
          if (!(!message || !roomId)) {
            _context2.next = 3;
            break;
          }
          throw new ErrorHandle(400, "Invalid data passed into request!");
        case 3:
          chat = {
            message: message,
            sender: userId,
            room: roomId,
            type: type
          };
          _context2.prev = 4;
          _context2.next = 7;
          return chatModel.create(chat);
        case 7:
          createMessage = _context2.sent;
          if (createMessage) {
            _context2.next = 10;
            break;
          }
          throw new ErrorHandle(400, "Fail to send message!");
        case 10:
          _context2.next = 12;
          return chatModel.findOne({
            _id: createMessage._id
          }).populate("sender", "-password").populate("room").exec();
        case 12:
          newMessage = _context2.sent;
          _context2.next = 15;
          return roomModel.findByIdAndUpdate(roomId, {
            lastMessage: createMessage
          });
        case 15:
          return _context2.abrupt("return", newMessage);
        case 18:
          _context2.prev = 18;
          _context2.t0 = _context2["catch"](4);
          throw new ErrorHandle(_context2.t0.statusCode, _context2.t0.message);
        case 21:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[4, 18]]);
  }));
  return function sendMessage(_x2, _x3) {
    return _ref2.apply(this, arguments);
  };
}();
var sendFileMessage = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return uploadMessageTypeFile(req, res);
        case 3:
          if (!req.file) {
            _context3.next = 7;
            break;
          }
          return _context3.abrupt("return", {
            success: true,
            url: req.file.path
          });
        case 7:
          throw new ErrorHandle(400, "Invalid file!");
        case 8:
          _context3.next = 13;
          break;
        case 10:
          _context3.prev = 10;
          _context3.t0 = _context3["catch"](0);
          throw new ErrorHandle(_context3.t0.statusCode, _context3.t0.message);
        case 13:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[0, 10]]);
  }));
  return function sendFileMessage(_x4, _x5) {
    return _ref3.apply(this, arguments);
  };
}();
module.exports = {
  getMessage: getMessage,
  sendMessage: sendMessage,
  sendFileMessage: sendFileMessage
};