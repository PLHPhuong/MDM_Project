const express = require("express");
const router = express.Router();
const axios = require("axios")
// const unityController = require('../controllers/unityController')

router.get("/", (req, res) => {
  res.render("index", {
    isIndex:true,
    layout: "main",
  });
});

router.get("/login", (req, res) => {
  res.render("login", {
    layout: "login",
  });
});

router.get("/404", (req, res) => {
  res.render("404", {
    layout: false,
  });
});

router.get("/test", (req, res) => {
  res.render("test", {
    layout: false,
  });
});

// router.get("/test1", (req, res) => {
//   res.render("test", {
//     layout: false,
//   });
// });
module.exports = router;
