const asyncHandler = require("express-async-handler");
const Activity = require("../models/activitiesModel");


// const unityF = require("./unity_used/unity_function");
// const ActivityRequired = Activity.schema.requiredPaths()
// @desc Get all Activities
// @route GET /api/
// @access Private
const getAllActivities = asyncHandler(async (req, res) => {
  res.status(200).json(await Activity.find());
});

// @desc Get an activities by id
// @route GET /api/attraction/id
// @access Private
const getAnActivities = asyncHandler(async (req, res) => {
  const result = await Activity.findById(req.params.id) || {message:'not found'}
  return res.status(200).json(result);
});



// @desc Create a activities
// @route POST /api/activities
// @access Private
const createAnActivities = asyncHandler(async (req, res) => {
  const error = await Activity.validate(req.body);
  if (error) {
    res.status(400).json(error.message);
  }
  const {
    name,
    short_description,
    image,
    duration,
    free_cancellation_available,
    city,
  } = req.body;

  const newItem = await Activity.create({
    name,
    short_description,
    image,
    duration,
    free_cancellation_available,
    city,
  });
  res.status(200).json(newItem);
});

module.exports = {
  getAllActivities,
  createAnActivities,
};
