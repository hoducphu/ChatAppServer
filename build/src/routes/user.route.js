"use strict";

var express = require("express");
var router = express.Router();
var _require = require("../auth/auth"),
  auth = _require.auth;
var userController = require("../controllers/user.controller");
router.post("/", userController.Register);
router.post("/login", userController.Login);
router.get("/", auth, userController.searchUser);
router.put("/updateUser", auth, userController.userUpdate);
router.put("/uploadAvatar", auth, userController.uploadAvatar);
module.exports = router;