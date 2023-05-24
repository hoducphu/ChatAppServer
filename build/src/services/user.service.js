"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var userModel = require("../model/user.model");
var _require = require("../utils/errorHandle"),
  ErrorHandle = _require.ErrorHandle;
var _require2 = require("../auth/auth"),
  generateToken = _require2.generateToken;
var bcrypt = require("bcrypt");
var _require3 = require("../utils/uploadFile"),
  uploadFileUtil = _require3.uploadFileUtil;
var register = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(body) {
    var email, password, fullname, phonenumber, image, userExist, newUser;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          email = body.email, password = body.password, fullname = body.fullname, phonenumber = body.phonenumber, image = body.image;
          if (!(!email || !password || !fullname || !phonenumber)) {
            _context.next = 3;
            break;
          }
          throw new ErrorHandle(400, "Please enter all the fields!");
        case 3:
          _context.next = 5;
          return userModel.findOne({
            email: email
          });
        case 5:
          userExist = _context.sent;
          if (!userExist) {
            _context.next = 8;
            break;
          }
          throw new ErrorHandle(400, "Email has been used!");
        case 8:
          _context.prev = 8;
          _context.next = 11;
          return userModel.create({
            email: email,
            password: password,
            fullname: fullname,
            phonenumber: phonenumber,
            image: image
          });
        case 11:
          newUser = _context.sent;
          if (!newUser) {
            _context.next = 16;
            break;
          }
          return _context.abrupt("return", {
            _id: newUser._id,
            email: newUser.email,
            fullname: newUser.fullname,
            phonenumber: newUser.phonenumber,
            image: newUser.image,
            token: generateToken(newUser._id)
          });
        case 16:
          throw new ErrorHandle(400, "Failed to create new user!");
        case 17:
          _context.next = 22;
          break;
        case 19:
          _context.prev = 19;
          _context.t0 = _context["catch"](8);
          throw new ErrorHandle(400, _context.t0.message);
        case 22:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[8, 19]]);
  }));
  return function register(_x) {
    return _ref.apply(this, arguments);
  };
}();
var login = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(email, password) {
    var user, correctPassword;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return userModel.findOne({
            email: email
          });
        case 2:
          user = _context2.sent;
          _context2.next = 5;
          return bcrypt.compare(password, user.password);
        case 5:
          correctPassword = _context2.sent;
          if (!(user && correctPassword)) {
            _context2.next = 16;
            break;
          }
          _context2.prev = 7;
          return _context2.abrupt("return", {
            _id: user._id,
            email: user.email,
            fullname: user.fullname,
            phonenumber: user.phonenumber,
            image: user.image,
            token: generateToken(user._id)
          });
        case 11:
          _context2.prev = 11;
          _context2.t0 = _context2["catch"](7);
          throw new ErrorHandle(_context2.t0.statusCode, _context2.t0.message);
        case 14:
          _context2.next = 17;
          break;
        case 16:
          throw new ErrorHandle(400, "Incorrect email or password!");
        case 17:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[7, 11]]);
  }));
  return function login(_x2, _x3) {
    return _ref2.apply(this, arguments);
  };
}();
var searchUser = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(query) {
    var keyword, listUser;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          keyword = query && query != "" ? {
            $or: [{
              fullname: {
                $regex: query,
                $options: "i"
              }
            }, {
              email: {
                $regex: query,
                $options: "i"
              }
            }, {
              phonenumber: {
                $regex: query,
                $options: "i"
              }
            }]
          } : {};
          if (!(Object.keys(keyword).length === 0)) {
            _context3.next = 3;
            break;
          }
          return _context3.abrupt("return");
        case 3:
          _context3.next = 5;
          return userModel.find(keyword).select("-password").limit(10).exec();
        case 5:
          listUser = _context3.sent;
          return _context3.abrupt("return", listUser ? listUser : []);
        case 7:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  }));
  return function searchUser(_x4) {
    return _ref3.apply(this, arguments);
  };
}();
var isNumber = function isNumber(numb) {
  if (typeof numb === "string") {
    return !isNaN(numb);
  }
};
var updateUser = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(id, body) {
    var salt, _updateUser, updatedUser;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return bcrypt.genSalt(10);
        case 2:
          salt = _context4.sent;
          if (!body.password) {
            _context4.next = 7;
            break;
          }
          _context4.next = 6;
          return bcrypt.hash(body.password, salt);
        case 6:
          body.password = _context4.sent;
        case 7:
          if (!(body.phonenumber && (body.phonenumber.length !== 10 || !isNumber(body.phonenumber)))) {
            _context4.next = 9;
            break;
          }
          throw new ErrorHandle(400, "Phone number must be 10 number");
        case 9:
          _context4.prev = 9;
          _context4.next = 12;
          return userModel.updateOne({
            _id: id
          }, {
            $set: body
          });
        case 12:
          _updateUser = _context4.sent;
          if (!_updateUser) {
            _context4.next = 20;
            break;
          }
          _context4.next = 16;
          return userModel.findById(id);
        case 16:
          updatedUser = _context4.sent;
          return _context4.abrupt("return", {
            _id: updatedUser._id,
            email: updatedUser.email,
            fullname: updatedUser.fullname,
            phonenumber: updatedUser.phonenumber,
            image: updatedUser.image,
            token: generateToken(updatedUser._id)
          });
        case 20:
          throw new ErrorHandle(400, "Cannot update user!");
        case 21:
          _context4.next = 26;
          break;
        case 23:
          _context4.prev = 23;
          _context4.t0 = _context4["catch"](9);
          throw new ErrorHandle(_context4.t0.statusCode, _context4.t0.message);
        case 26:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[9, 23]]);
  }));
  return function updateUser(_x5, _x6) {
    return _ref4.apply(this, arguments);
  };
}();
var updateAvatar = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
    var updateUserAvatar, updatedUser;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _context5.next = 3;
          return uploadFileUtil(req, res);
        case 3:
          if (!req.file) {
            _context5.next = 14;
            break;
          }
          _context5.next = 6;
          return userModel.findByIdAndUpdate(req.user.id, {
            image: req.file.path
          });
        case 6:
          updateUserAvatar = _context5.sent;
          if (!updateUserAvatar) {
            _context5.next = 12;
            break;
          }
          _context5.next = 10;
          return userModel.findById(req.user.id);
        case 10:
          updatedUser = _context5.sent;
          return _context5.abrupt("return", {
            _id: updatedUser._id,
            email: updatedUser.email,
            fullname: updatedUser.fullname,
            phonenumber: updatedUser.phonenumber,
            image: updatedUser.image,
            token: generateToken(updatedUser._id)
          });
        case 12:
          _context5.next = 15;
          break;
        case 14:
          throw new ErrorHandle(400, "Cannot update avatar!");
        case 15:
          _context5.next = 20;
          break;
        case 17:
          _context5.prev = 17;
          _context5.t0 = _context5["catch"](0);
          throw new ErrorHandle(_context5.t0.statusCode, _context5.t0.message);
        case 20:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[0, 17]]);
  }));
  return function updateAvatar(_x7, _x8) {
    return _ref5.apply(this, arguments);
  };
}();
module.exports = {
  register: register,
  login: login,
  searchUser: searchUser,
  updateUser: updateUser,
  updateAvatar: updateAvatar
};