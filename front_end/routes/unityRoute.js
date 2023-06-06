const express = require("express");
const router = express.Router();
// const unityController = require('../controllers/unityController')

router.get("/", (req, res) => {
  res.render("index", {
    layout: "main",
  });
});

router.get("/test", (req, res) => {
  res.render("index", {
    layout: "main_copy",
  });
});
router.get("/test1", (req, res) => {
  res.render("test", {
    layout: false,
  });
});
module.exports = router;
