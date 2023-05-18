const userModel = require("../model/user.model");
const { ErrorHandle } = require("../utils/errorHandle");
const { generateToken } = require("../auth/auth");
const bcrypt = require("bcrypt");
const { uploadFileUtil } = require("../utils/uploadFile");

const register = async (body) => {
  const { email, password, fullname, phonenumber, image } = body;

  if (!email || !password || !fullname || !phonenumber) {
    throw new ErrorHandle(400, "Please enter all the fields!");
  }

  const userExist = await userModel.findOne({ email });

  if (userExist) {
    throw new ErrorHandle(400, "Email has been used!");
  }

  try {
    let newUser = await userModel.create({
      email,
      password,
      fullname,
      phonenumber,
      image,
    });

    if (newUser) {
      return {
        _id: newUser._id,
        email: newUser.email,
        fullname: newUser.fullname,
        phonenumber: newUser.phonenumber,
        image: newUser.image,
        token: generateToken(newUser._id),
      };
    } else {
      throw new ErrorHandle(400, "Failed to create new user!");
    }
  } catch (error) {
    throw new ErrorHandle(400, error.message);
  }
};

const login = async (email, password) => {
  const user = await userModel.findOne({ email });
  const correctPassword = await bcrypt.compare(password, user.password);

  if (user && correctPassword) {
    try {
      return {
        _id: user._id,
        email: user.email,
        fullname: user.fullname,
        phonenumber: user.phonenumber,
        image: user.image,
        token: generateToken(user._id),
      };
    } catch (err) {
      throw new ErrorHandle(err.statusCode, err.message);
    }
  } else {
    throw new ErrorHandle(400, "Incorrect email or password!");
  }
};

const searchUser = async (query) => {
  const keyword =
    query && query != ""
      ? {
          $or: [
            { fullname: { $regex: query, $options: "i" } },
            { email: { $regex: query, $options: "i" } },
            { phonenumber: { $regex: query, $options: "i" } },
          ],
        }
      : {};

  if (Object.keys(keyword).length === 0) {
    return;
  }

  const listUser = await userModel
    .find(keyword)
    .select("-password")
    .limit(10)
    .exec();

  return listUser ? listUser : [];
};

const isNumber = (numb) => {
  if (typeof numb === "string") {
    return !isNaN(numb);
  }
};

const updateUser = async (id, body) => {
  const salt = await bcrypt.genSalt(10);

  if (body.password) {
    body.password = await bcrypt.hash(body.password, salt);
  }

  if (
    body.phonenumber &&
    (body.phonenumber.length !== 10 || !isNumber(body.phonenumber))
  ) {
    throw new ErrorHandle(400, "Phone number must be 10 number");
  }

  try {
    const updateUser = await userModel.updateOne({ _id: id }, { $set: body });

    if (updateUser) {
      const updatedUser = await userModel.findById(id);
      return {
        _id: updatedUser._id,
        email: updatedUser.email,
        fullname: updatedUser.fullname,
        phonenumber: updatedUser.phonenumber,
        image: updatedUser.image,
        token: generateToken(updatedUser._id),
      };
    } else {
      throw new ErrorHandle(400, "Cannot update user!");
    }
  } catch (err) {
    throw new ErrorHandle(err.statusCode, err.message);
  }
};

const updateAvatar = async (req, res) => {
  try {
    await uploadFileUtil(req, res);
    if (req.file) {
      const updateUserAvatar = await userModel.findByIdAndUpdate(req.user.id, {
        image: req.file.path,
      });

      if (updateUserAvatar) {
        const updatedUser = await userModel.findById(req.user.id);
        return {
          _id: updatedUser._id,
          email: updatedUser.email,
          fullname: updatedUser.fullname,
          phonenumber: updatedUser.phonenumber,
          image: updatedUser.image,
          token: generateToken(updatedUser._id),
        };
      }
    } else {
      throw new ErrorHandle(400, "Cannot update avatar!");
    }
  } catch (err) {
    throw new ErrorHandle(err.statusCode, err.message);
  }
};

module.exports = { register, login, searchUser, updateUser, updateAvatar };
