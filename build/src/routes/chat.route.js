"use strict";

var express = require("express");
var router = express.Router();
var _require = require("../auth/auth"),
  auth = _require.auth;
var chatController = require("../controllers/chat.controller");
router.get("/:roomId", auth, chatController.getMessage);
router.post("/", auth, chatController.sendMessage);
router.post("/fileMessage", auth, chatController.sendFileMessage);
module.exports = router;