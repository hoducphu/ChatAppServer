const express = require("express");
const router = express.Router();
const { auth } = require("../auth/auth");
const chatController = require("../controllers/chat.controller");

router.get("/:roomId", auth, chatController.getMessage);
router.post("/", auth, chatController.sendMessage);
router.post("/fileMessage", auth, chatController.sendFileMessage);

module.exports = router;
