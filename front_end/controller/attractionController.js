const Attraction = require("../models/attractionModel");

const LoadMainPageAttraction = async (req, res, next) => {
  const user = req.session.user;
  const data = await Attraction.LoadCitiesByContinent();
  res.render("attraction_main", {
    layout: "main",
    data: data,
    user: user,
  });
};
const LoadFilterAttractionPage = async (req, res, next) => {
  const user = req.session.user;
  const city = req.params.city;
  if (city) {
    req.body.city = city;
  }
  const search_text = req.body["search-text"];
  let selectedDate = req.body["selected-date"];
  if (!selectedDate) selectedDate = new Date().toISOString().substr(0, 10);

  const data = await Attraction.SearchAttraction(req.body);
  if (!data || data["stack"] || data["message"]) {
    res.render("attraction_filter_by_continent", {
      layout: "main",
      city: city,
      search: search_text,
      selectedDate: selectedDate,
      data: [],
      user: user,
    });
  }

  res.render("attraction_filter_by_continent", {
    layout: "main",
    city: city,
    search: search_text,
    selectedDate: selectedDate,
    data: data,
    user: user,
  });
};
module.exports = {
  LoadMainPageAttraction,
  LoadFilterAttractionPage,
};
