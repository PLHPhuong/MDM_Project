const express = require("express");
const router = express.Router();
const axios = require("axios")
const userController = require('../controller/userController')
// const unityController = require('../controllers/unityController')

router.get("/", (req, res) => {
  res.render("index", {
    isIndex: true,
    user: req.session.user ,
    layout: "main",
  });
});

router.get("/register",userController.register);
router.post("/register",userController.postRegister);
router.post("/login",userController.postLogin);
router.get("/login",userController.sessionCheckerRedirecter,userController.login);
router.get("/logout", userController.logout);

router.get("/404", (req, res) => {
  res.render("404", {
    layout: false,
  });
});

router.get("/test1", (req, res) => {
  res.render("test1", {
    layout: "test1",
  });
});

router.get("/test", (req, res) => {
  res.render("test", {
    layout: false,
  });
});
module.exports = router;
