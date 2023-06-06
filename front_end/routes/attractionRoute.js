const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("attraction_main", {
    layout: "main",
  });
});

module.exports = router;
