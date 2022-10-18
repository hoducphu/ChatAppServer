const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

let userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Invalid email address",
      ],
    },
    password: {
      type: String,
      required: true,
      minlength: [6, "Password must be at least 6 character"],
      maxlength: [15, "Email must be at most 6 character"],
    },
    fullname: { type: String, required: true, maxlength: 50 },
    phonenumber: {
      type: String,
      required: true,
      minlength: [10, "Phonenumber must have 10 number"],
      maxlength: [10, "Phonenumber must have 10 number"],
    },
    image: { type: String },
  },
  { timestamps: true }
);

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// auto encode password
userSchema.pre("save", async function (next) {
  if (!this.isModified) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model("users", userSchema);

module.exports = User;
