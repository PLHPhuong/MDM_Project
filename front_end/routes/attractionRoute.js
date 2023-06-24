const express = require("express");
const router = express.Router();
const axios = require("axios");
const asyncHandler = require("express-async-handler");

router.get("/", (req, res) => {
  res.render("attraction_main", {
    layout: "main",
  });
});

router.get("/", async (req, res) => {
  try {
    const response = await axios.get("/api/acttraction");
    const items = response.data;
    res.render("test1", { items });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error");
  }
});

router.get(
  "/test1",
  asyncHandler(async (req, res) => {
    const response = await axios.get("http://localhost:8000/api/acttraction");

    const data = {
      title: "Attraction management",
      // items: [
      //   { id: 1, attractionName: "HaNoi" },
      //   { id: 2, attractionName: "TpHCM" },
      //   { id: 3, attractionName: "HaiPhong" },
      // ],
      attractionList: response.data,
    };

    res.render("test1", {
      layout: "test1",
      data,
    });
  })
);

router.get(
  "/attractionDetail/:id",
  asyncHandler(async (req, res) => {
    const response = await axios.get(
      "http://localhost:8000/api/acttraction/" + req.params.id
    );

    const data = {
      title: "Attraction detail update",
      attractionItem: response.data[0],
    };

    res.render("attraction_detail", {
      layout: "test1",
      data,
    });
  })
);

//Create an attraction
router.post(
  "/submit",
  asyncHandler(async (req, res) => {
    const response = await axios.get("http://localhost:8000/api/acttraction");
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
    const response = await axios.get(
      "http://localhost:8000/api/acttraction/" + req.params.id
    );
    // console.log("Id: " + req.body._id);
    // console.log("Name" + response.data.name);

    res.redirect(`/attraction/attractionDetail/${req.params.id}`);
  })
);

module.exports = router;
