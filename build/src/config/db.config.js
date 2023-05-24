"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var mongoose = require("mongoose");

// Connecting to the database
function ConnectToMongoDB() {
  return _ConnectToMongoDB.apply(this, arguments);
}
function _ConnectToMongoDB() {
  _ConnectToMongoDB = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return mongoose.connect(process.env.MONGODB_PATH, {
            useNewUrlParser: true
          }).then(function () {
            console.log("Successfully connected to the database");
          });
        case 3:
          _context.next = 8;
          break;
        case 5:
          _context.prev = 5;
          _context.t0 = _context["catch"](0);
          console.log("Error: " + _context.t0);
        case 8:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 5]]);
  }));
  return _ConnectToMongoDB.apply(this, arguments);
}
module.exports = {
  ConnectToMongoDB: ConnectToMongoDB
};