const express = require("express");
const router = express.Router();
const AttractionController = require("../controller/attractionController");
// router.get("/", (req, res) => {
//   res.render("attraction_main", {
//     layout: "main",
//   });
// });
router.get("/", AttractionController.LoadMainPageAttraction);

// router.get("/:continent", (req, res) => {
//   res.render("attraction_filter_by_continent", {
//     continent: req.params.continent,
//     layout: "main",
//   });
// });

router.get("/:city", AttractionController.LoadFilterAttractionPage);
router.post("/search", AttractionController.LoadFilterAttractionPage);

router.get("/act/comment", (req, res) => {
  res.render("comment", {
    layout: "main",
    user: req.session.user,
  });
});

router.post("/act/comment", (req, res) => {
  req.body.rating = parseFloat(req.body.rating)
  console.log(req.body);
  res.redirect('/attraction/act/comment')
  // res.render("comment", {
  //   layout: "main",
  //   user: req.session.user,
  // });
});

module.exports = router;
