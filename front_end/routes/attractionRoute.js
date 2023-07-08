const express = require("express");
const router = express.Router();
const axios = require("axios");
const asyncHandler = require("express-async-handler");

function handleActtractionReq(req) {
  req["duration"] = {
    min_duration: req["min_duration"],
    max_duration: req["max_duration"],
  };
  const itinerary_stops = [];
  for (index in req["itinerary_stops"]["name"]) {
    itinerary_stops.push({
      name: req["itinerary_stops"]["name"][index],
      description: req["itinerary_stops"]["description"][index],
      duration: parseInt(req["itinerary_stops"]["duration"][index]),
      admission_ticket:
        req["itinerary_stops"]["admission_ticket"][index] == "true",
    });
  }
  req["itinerary_stops"] = itinerary_stops;

  const available = [];
  for (index in req["available"]["start"]) {
    available.push({
      start: req["available"]["start"][index],
      end: req["available"]["end"][index],
    });
  }
  req["available"] = available;

  const ticket_type = [];
  for (index in req["ticket"]["ticket_type"]["name"]) {
    ticket_type.push({
      name: req["ticket"]["ticket_type"]["name"][index],
      people_per_ticket: parseInt(
        req["ticket"]["ticket_type"]["people_per_ticket"][index]
      ),
      price: parseFloat(req["ticket"]["ticket_type"]["price"][index]),
    });
  }
  req["ticket"]["ticket_type"] = ticket_type;
  return req;
}
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

// router.get("/comment", (req, res) => {
//   user = req.session.user;
//   res.render("comment", {
//     layout: "secondary",
//     user: user,
//   });
// });

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
    const response = await axios.get(
      "http://localhost:8000/api/activities/user/" + user._id
    );

    // console.log(user)
    res.render("test1", {
      layout: "secondary",
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
    const id = req.params.id;
    user = req.session.user;
    const response = await axios.get(
      "http://localhost:8000/api/acttraction/" + id
    );
    const comments = await AttractionModel.GetAttractionComments(id);
    console.log(comments);
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
    user = req.session.user
    console.log("create");
    req_body = req.body;
    req_body = handleActtractionReq(req_body);
    if (!req_body["buyer"] || req_body["buyer"].trim()==='') {
      req_body["buyer"] = "6489e66e0e06f9c68a03f9d0";
    }
    console.log(req_body);
    console.log(req_body.ticket.ticket_type);

    try {
      const response = await axios.post(
        "http://localhost:8000/api/acttraction",
        req_body
      );
      console.log(response.data)
      // res.redirect("/attraction/comment");
      res.redirect("/attraction/test1");
    } catch (error) {
      console.error("Error:", error);
    }
    // res.redirect("/attraction/test1")
    // const data = {
    //   attractionItem: response.data,
    // };

    // res.redirect("/attraction/test1");
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
    res.redirect("/attraction/comment");
    // res.redirect(`/attraction/attractionDetail/${req.params.id}`);
  })
);

module.exports = router;
