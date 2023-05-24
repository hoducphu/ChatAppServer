const multer = require("multer");
const util = require("util");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `uploads/`);
  },

  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});
let uploadFile = multer({ storage: storage }).single("uploadAvatar");
let uploadMessageFile = multer({ storage: storage }).single(
  "uploadMessageFile"
);

let uploadFileUtil = util.promisify(uploadFile);
let uploadMessageTypeFile = util.promisify(uploadMessageFile);

module.exports = { uploadMessageTypeFile, uploadFileUtil };
