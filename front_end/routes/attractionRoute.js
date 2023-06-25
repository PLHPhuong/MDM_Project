const express = require("express");
const router = express.Router();
const axios = require("axios");
const asyncHandler = require("express-async-handler");

const AttractionController = require("../controller/attractionController");
const AttractionModel = require("../models/attractionModel");
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

router.get("/search/:city", AttractionController.LoadFilterAttractionPage);
router.post("/search", AttractionController.LoadFilterAttractionPage);

router.get("/attractionDetail/comment", (req, res) => {
  user = req.session.user;
  res.render("comment", {
    layout: "main",
    user: user,
  });
});

router.get("/", async (req, res) => {
  user = req.session.user;

  try {
    const response = await axios.get("/api/acttraction");
    const items = response.data;
    res.render("test1", { items, user });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error");
  }
});

router.get(
  "/test1",
  asyncHandler(async (req, res) => {
    user = req.session.user;
    // const response = await axios.get("http://localhost:8000/api/acttraction");
    const response = await axios.get("http://localhost:8000/api/activities/user/"+user._id);


    // console.log(user)
    res.render("test1", {
      layout: "main",
      user: user,
      data: {
        title: "Attraction management",
        attractionList: response.data,
      },
    });
  })
);

router.get(
  "/attractionDetail/:id",
  asyncHandler(async (req, res) => {
    const id = req.params.id
    user = req.session.user;
    const response = await axios.get(
      "http://localhost:8000/api/acttraction/" + id 
    );
    const comments = await AttractionModel.GetAttractionComments(id);
    console.log(comments)
    // const data = {
    //   title: "Attraction detail",
    //   attractionItem: response.data[0],
    // };
    
    // console.log(comments)
    res.render("attraction_detail", {
      layout: "main",
      data: {
        title: "Attraction detail",
        attractionItem: response.data[0],
      },
      user,
      comments: comments,
    });
  })
);
router.post(
  "/attractionDetail/:id/comment",
  AttractionController.AddCommentToAttraction
);
//Create an attraction
router.post(
  "/submit",
  asyncHandler(async (req, res) => {
    const response = await axios.get("http://localhost:8000/api/acttraction");
    user = req.session.user;

    const data = {
      attractionItem: response.data,
    };
    console.log(req.body);
    res.redirect("/attraction/test1");
  })
);

// Update an attraction by id
router.post(
  "/submit/:id",
  asyncHandler(async (req, res) => {
    console.log(req.body);
    user = req.session.user;

    const response = await axios.get(
      "http://localhost:8000/api/acttraction/" + req.params.id
    );
    // console.log("Id: " + req.body._id);
    // console.log("Name" + response.data.name);

    res.redirect(`/attraction/attractionDetail/${req.params.id}`);
  })
);

module.exports = router;
