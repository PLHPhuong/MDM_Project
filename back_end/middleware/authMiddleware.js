const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

const protect = asyncHandler(async (req, res, next) => {
  if (!req.headers.user) {
    res.status(401);
    throw new Error("User not logged in yet");
  }

  // // header has user as object (not jwt)
  // req.user = await User.findById( JSON.parse(req.headers.user)._id).select('-password')

  // header has user as user id (not jwt)
  req.user = await User.findById(req.headers.user).select("-password");

  next();
});
module.exports = {
  protect,
};
