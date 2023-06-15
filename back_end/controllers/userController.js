const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const unityF = require("./unity_used/unity_function");
// @desc Register
// @route POST /api/user/register
// @access Private
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, avatar } = req.body;

  // // Solution 2: may be slower than 1 can custom error message
  const missing = ["email", "password"].filter(
    (key) => !req.body.hasOwnProperty(key)
  );
  console.log(missing);
  if (!email || !password) {
    res.status(400);
    throw new Error(`Please add ${missing.join(", ")} fields`);
  }

  // Check if user exists
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  try {
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      avatar,
    });
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(400).json(error._message);
  }
});

// @desc Login
// @route POST /api/user/login
// @access Private
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
    });
  } else {
    res.status(400);
    throw new Error("Invalid credentials");
  }
});
// @desc Login
// @route POST /api/user/login
// @access Private
const getMe = asyncHandler(async (req, res) => {
  // cmdline what is not needed
  await req.user.populate([{
    path: 'tickets',
    model: 'PurchaseTicket',
  },{
    path: 'activities',
    model: 'Activity',
    populate: {
      path: 'ticket_sales',
      model: "PurchaseTicket"
    }
  }])
  res.status(200).json(req.user);
});

module.exports = {
  registerUser,
  login,
  getMe,
};
