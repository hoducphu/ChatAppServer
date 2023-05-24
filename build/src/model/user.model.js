"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var mongoose = require("mongoose");
var bcrypt = require("bcrypt");
var userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Invalid email address"]
  },
  password: {
    type: String,
    required: true,
    minlength: [6, "Password must be at least 6 character"],
    maxlength: [15, "Email must be at most 6 character"]
  },
  fullname: {
    type: String,
    required: true,
    maxlength: 50
  },
  phonenumber: {
    type: String,
    required: true,
    minlength: [10, "Phonenumber must have 10 number"],
    maxlength: [10, "Phonenumber must have 10 number"]
  },
  image: {
    type: String
  }
}, {
  timestamps: true
});
userSchema.methods.matchPassword = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(enteredPassword) {
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return bcrypt.compare(enteredPassword, this.password);
        case 2:
          return _context.abrupt("return", _context.sent);
        case 3:
        case "end":
          return _context.stop();
      }
    }, _callee, this);
  }));
  return function (_x) {
    return _ref.apply(this, arguments);
  };
}();

// auto encode password
userSchema.pre("save", /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(next) {
    var salt;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          if (!this.isModified) {
            next();
          }
          _context2.next = 3;
          return bcrypt.genSalt(10);
        case 3:
          salt = _context2.sent;
          _context2.next = 6;
          return bcrypt.hash(this.password, salt);
        case 6:
          this.password = _context2.sent;
        case 7:
        case "end":
          return _context2.stop();
      }
    }, _callee2, this);
  }));
  return function (_x2) {
    return _ref2.apply(this, arguments);
  };
}());
var User = mongoose.model("users", userSchema);
module.exports = User;