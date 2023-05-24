"use strict";

var multer = require("multer");
var util = require("util");
var storage = multer.diskStorage({
  destination: function destination(req, file, cb) {
    cb(null, "build/src/uploads/");
  },
  filename: function filename(req, file, cb) {
    cb(null, "".concat(Date.now(), "_").concat(file.originalname));
  }
});
var uploadFile = multer({
  storage: storage
}).single("uploadAvatar");
var uploadMessageFile = multer({
  storage: storage
}).single("uploadMessageFile");
var uploadFileUtil = util.promisify(uploadFile);
var uploadMessageTypeFile = util.promisify(uploadMessageFile);
module.exports = {
  uploadMessageTypeFile: uploadMessageTypeFile,
  uploadFileUtil: uploadFileUtil
};