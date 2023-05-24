const express = require("express");
const router = express.Router();
const { auth } = require("../auth/auth");
const userController = require("../controllers/user.controller");

router.post("/", userController.Register);
router.post("/login", userController.Login);
router.get("/", auth, userController.searchUser);
router.put("/updateUser", auth, userController.userUpdate);
router.put("/uploadAvatar", auth, userController.uploadAvatar);

module.exports = router;
