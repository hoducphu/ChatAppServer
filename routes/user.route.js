const express = require("express");
const router = express.Router();
const { auth } = require("../auth/auth");
const userController = require("../controllers/user.controller");

router.post("/", userController.Register);
router.post("/login", userController.Login);
router.get("/", auth, userController.searchUser);
router.put("/:id", auth, userController.userUpdate);
router.put("/uploadAvatar/:id", userController.uploadAvatar);

module.exports = router;
