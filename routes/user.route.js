const express = require("express");
const router = express.Router();
const { auth } = require("../auth/auth");
// const { uploadFile } = require("../utils/uploadFile");
const multer = require("multer");

const userController = require("../controllers/user.controller");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `uploads/`);
  },

  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});
const upload = multer({ storage: storage });

router.post("/", userController.Register);
router.post("/login", userController.Login);
router.get("/", auth, userController.searchUser);
router.put("/:id", auth, userController.userUpdate);
router.put("/uploadAvatar/:id", userController.uploadAvatar);

module.exports = router;
