const Attraction = require("../models/attractionModel")

const LoadMainPageAttraction = async (req, res, next) => {
    const data =  await Attraction.LoadCitiesByContinent()
    res.render("attraction_main", {
        layout: "main",
        data:data
      });
  };

module.exports = {
    LoadMainPageAttraction
}