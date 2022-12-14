const jwt = require("jsonwebtoken");
const User = require("../model/user.model");
const secretKey = process.env.JWT_SECRET_KEY;

const generateToken = (id) => {
  return jwt.sign({ id }, secretKey, {
    expiresIn: "30d",
  });
};

const auth = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      //decodes token id
      const decoded = jwt.verify(token, secretKey);

      req.user = await User.findById(decoded.id).select("-password");

      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
};

module.exports = { generateToken, auth };
