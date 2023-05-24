"use strict";

var express = require("express");
var router = express.Router();
var _require = require("../auth/auth"),
  auth = _require.auth;
var roomController = require("../controllers/room.controller");
router.get("/", auth, roomController.getUserRoom);
router.post("/", auth, roomController.createRoom);
router.put("/addUser", auth, roomController.addUserToRoom);
router.put("/removeUser", auth, roomController.removeUserFromRoom);
router.put("/rename", auth, roomController.renameRoom);
module.exports = router;