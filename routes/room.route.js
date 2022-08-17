const express = require("express");
const router = express.Router();
const { auth } = require("../auth/auth");

const roomController = require("../controllers/room.controller");

router.get("/", auth, roomController.getUserRoom);
router.post("/", auth, roomController.createRoom);
router.put("/addUser", auth, roomController.addUserToRoom);
router.put("/removeUser", auth, roomController.removeUserFromRoom);
router.put("/rename", auth, roomController.renameRoom);

module.exports = router;
