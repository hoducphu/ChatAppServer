"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var jwt = require("jsonwebtoken");
var User = require("../model/user.model");
var _require = require("../utils/errorHandle"),
  ErrorHandle = _require.ErrorHandle;
var secretKey = process.env.JWT_SECRET_KEY;
var generateToken = function generateToken(id) {
  return jwt.sign({
    id: id
  }, secretKey, {
    expiresIn: "30d"
  });
};
var auth = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
    var token, decoded;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          if (!(req.headers.authorization && req.headers.authorization.startsWith("Bearer"))) {
            _context.next = 13;
            break;
          }
          _context.prev = 1;
          token = req.headers.authorization.split(" ")[1];

          //decodes token id
          decoded = jwt.verify(token, secretKey);
          _context.next = 6;
          return User.findById(decoded.id).select("-password");
        case 6:
          req.user = _context.sent;
          next();
          _context.next = 13;
          break;
        case 10:
          _context.prev = 10;
          _context.t0 = _context["catch"](1);
          throw new ErrorHandle(401, "Not authorized, token failed!");
        case 13:
          if (token) {
            _context.next = 15;
            break;
          }
          throw new ErrorHandle(401, "Not authorized, no token!");
        case 15:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[1, 10]]);
  }));
  return function auth(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();
module.exports = {
  generateToken: generateToken,
  auth: auth
};