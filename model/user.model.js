const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

let userSchema = mongoose.Schema(
  {
    email: { type: String, required: true, trim: true, unique: true },
    password: { type: String, required: true, minlength: 6 },
    fullname: { type: String, required: true, maxlength: 50 },
    phonenumber: { type: String, required: true },
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
