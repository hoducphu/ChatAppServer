const asyncHandler = require("express-async-handler");
const userService = require("../services/user.service");

const Register = asyncHandler(async (req, res) => {
  const user = await userService.register(req.body);

  res.status(201).json(user);
});

const Login = async (req, res) => {
  const user = await userService.login(req.body.email, req.body.password);

  res.status(200).json(user);
};

const searchUser = asyncHandler(async (req, res) => {
  const listUser = await userService.searchUser(req.query.search);

  res.status(200).json(listUser);
});

const userUpdate = async (req, res) => {
  const user = await userService.updateUser(req.user.id, req.body);

  res.status(200).json(user);
};

const uploadAvatar = asyncHandler(async (req, res) => {
  const user = await userService.updateAvatar(req, res);

  res.status(200).json(user);
});

module.exports = { Register, searchUser, userUpdate, Login, uploadAvatar };
