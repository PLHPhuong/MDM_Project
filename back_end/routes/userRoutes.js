const express = require("express");
const router = express.Router();
const user = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");


router.post("/register", user.registerUser);
router.post("/login",user.login);
router.get("/", protect ,user.getMe);

module.exports = router;
