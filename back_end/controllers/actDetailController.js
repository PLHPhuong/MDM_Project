const asyncHandler = require("express-async-handler");
const ActDetail = require("../models/actDetailModel");

// @desc Create an actitvity's detail
// @route POST /api/actdetail/
// @access Private
const createAnActDetail = asyncHandler(async (req, res) => {
  const error = await ActDetail.validate(req.body);
  if (error) {
    res.status(400).json(error.message);
  }
  const {
    pick_up_included,
    description,
    included,
    not_included,
    accessibility,
    health_safety,
    languages,
    additional_information,
    location_departure,
    location_end,
    itinerary_stops,
    available,
    ticket
  } = req.body;

  const newItem = await ActDetail.create({
    pick_up_included,
    description,
    included,
    not_included,
    accessibility,
    health_safety,
    languages,
    additional_information,
    location_departure,
    location_end,
    itinerary_stops,
    available,
    ticket
  });
  res.status(200).json(newItem);
});

module.exports = {
  createAnActDetail,
};
