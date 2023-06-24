const express = require("express");
const router = express.Router();
const AttractionController = require("../controller/attractionController")
// router.get("/", (req, res) => {
//   res.render("attraction_main", {
//     layout: "main",
//   });
// });
router.get("/", AttractionController.LoadMainPageAttraction);
router.get("/:continent", (req, res) => {
  res.render("attraction_filter_by_continent", {
    continent: req.params.continent,
    layout: "main",
  });
});

module.exports = router;
