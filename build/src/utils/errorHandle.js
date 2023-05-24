"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));
var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));
var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));
var _wrapNativeSuper2 = _interopRequireDefault(require("@babel/runtime/helpers/wrapNativeSuper"));
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var ErrorHandle = /*#__PURE__*/function (_Error) {
  (0, _inherits2["default"])(ErrorHandle, _Error);
  var _super = _createSuper(ErrorHandle);
  function ErrorHandle(statusCode, message) {
    var _this;
    (0, _classCallCheck2["default"])(this, ErrorHandle);
    _this = _super.call(this);
    _this.status = "error";
    _this.statusCode = statusCode;
    _this.message = message;
    return _this;
  }
  return (0, _createClass2["default"])(ErrorHandle);
}( /*#__PURE__*/(0, _wrapNativeSuper2["default"])(Error));
var errorHandle = function errorHandle(err, req, res, next) {
  var statusCode = err.statusCode,
    message = err.message;
  res.status(statusCode || 500).json({
    status: "error",
    statusCode: statusCode || 500,
    message: statusCode === 500 ? "Database Error" : message
  });
  next();
};
module.exports = {
  errorHandle: errorHandle,
  ErrorHandle: ErrorHandle
};