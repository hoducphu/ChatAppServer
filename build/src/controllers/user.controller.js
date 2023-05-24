"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var asyncHandler = require("express-async-handler");
var userService = require("../services/user.service");
var Register = asyncHandler( /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var user;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return userService.register(req.body);
        case 2:
          user = _context.sent;
          res.status(201).json(user);
        case 4:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());
var Login = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var user;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return userService.login(req.body.email, req.body.password);
        case 2:
          user = _context2.sent;
          res.status(200).json(user);
        case 4:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return function Login(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
var searchUser = asyncHandler( /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var listUser;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return userService.searchUser(req.query.search);
        case 2:
          listUser = _context3.sent;
          res.status(200).json(listUser);
        case 4:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  }));
  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}());
var userUpdate = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var user;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return userService.updateUser(req.user.id, req.body);
        case 2:
          user = _context4.sent;
          res.status(200).json(user);
        case 4:
        case "end":
          return _context4.stop();
      }
    }, _callee4);
  }));
  return function userUpdate(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();
var uploadAvatar = asyncHandler( /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
    var user;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return userService.updateAvatar(req, res);
        case 2:
          user = _context5.sent;
          res.status(200).json(user);
        case 4:
        case "end":
          return _context5.stop();
      }
    }, _callee5);
  }));
  return function (_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}());
module.exports = {
  Register: Register,
  searchUser: searchUser,
  userUpdate: userUpdate,
  Login: Login,
  uploadAvatar: uploadAvatar
};