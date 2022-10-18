const User = require("../model/user.model");
const asyncHandler = require("express-async-handler");
const { generateToken } = require("../auth/auth");
const { uploadFileUtil } = require("../utils/uploadFile");
const bcrypt = require("bcrypt");

const Register = asyncHandler(async (req, res) => {
  const { email, password, fullname, phonenumber, image } = req.body;
  let err = [];

  // Check fields
  if (!email || !password || !fullname || !phonenumber) {
    err.push("Please enter all the fields!");
    res.status(400).send({ err });
    throw new Error("Please enter all the fields!");
  }

  // Check user exist
  const userExist = await User.findOne({ email });

  if (userExist) {
    err.push("Email has been used!");
    res.status(400).send({ err });
    throw new Error("Email has been used!");
  }

  // Create new user
  try {
    let newUser = await User.create({
      email,
      password,
      fullname,
      phonenumber,
      image,
    });

    if (newUser) {
      res.status(201).json({
        _id: newUser._id,
        email: newUser.email,
        fullname: newUser.fullname,
        phonenumber: newUser.phonenumber,
        image: newUser.image,
        token: generateToken(newUser._id),
      });
    } else {
      res.status(400);
      throw new Error("Failed to create new user!");
    }
  } catch (error) {
    if (error.errors.email) {
      err.push(error.errors.email.message);
    }

    if (error.errors.password) {
      err.push(error.errors.password.message);
    }

    if (error.errors.phonenumber) {
      err.push(error.errors.phonenumber.message);
    }

    res.status(400).send({ err });
    throw new Error(err);
  }
});

// Search
const searchUser = asyncHandler(async (req, res) => {
  const keyword = req.query.search
    ? {
        $or: [
          { fullname: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
          { phonenumber: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};

  const users = await User.find(keyword).select("-password").exec();
  res.send(users);
});

async function userUpdate(req, res) {
  const salt = await bcrypt.genSalt(10);

  if (req.body.password) {
    req.body.password = await bcrypt.hash(req.body.password, salt);
  }
  await User.updateOne({ _id: req.params.id }, { $set: req.body })
    .then(async () => {
      const result = await User.findById(req.params.id);
      res.status(200).json({
        _id: result._id,
        email: result.email,
        fullname: result.fullname,
        phonenumber: result.phonenumber,
        image: result.image,
        token: generateToken(result._id),
      });
    })
    .catch((err) => {
      res.status(400);
      throw new Error("Cannot update user!");
    });
}

const Login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.status(200).json({
      _id: user._id,
      email: user.email,
      fullname: user.fullname,
      phonenumber: user.phonenumber,
      image: user.image,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Incorrect email or password!");
  }
};

const uploadAvatar = asyncHandler(async (req, res) => {
  try {
    await uploadFileUtil(req, res);
    if (req.file) {
      await User.findByIdAndUpdate(req.params.id, {
        image: req.file.path,
      }).then(async () => {
        const result = await User.findById(req.params.id);
        res.status(200).json({
          _id: result._id,
          email: result.email,
          fullname: result.fullname,
          phonenumber: result.phonenumber,
          image: result.image,
          token: generateToken(result._id),
        });
      });
    } else {
      res.status(401);
      throw new Error("File does not exist!");
    }
  } catch (err) {
    res.status(401);
    throw new Error("File does not exist!");
  }
});

module.exports = { Register, searchUser, userUpdate, Login, uploadAvatar };
