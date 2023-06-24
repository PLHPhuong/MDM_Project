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
  const result = (await Activity.findById(req.params.id)) || {
    message: "not found",
  };
  return res.status(200).json(result);
});


// @desc Get an activities by id
// @route GET /api/attraction/id
// @access Private
const getAnActivitiesByUserId = asyncHandler(async (req, res) => {
  const result = (await Activity.find({owner:req.params.id})) || {
    message: "not found",
  };
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
    country,continent,
  } = req.body;

  const newItem = await Activity.create({
    name,
    short_description,
    image,
    duration,
    free_cancellation_available,
    city,
    country,continent,
  });
  res.status(200).json(newItem);
});

// @desc Get cities in document by 
// @route GET /api/activities/continent/city
// @access Private
const getCitiesByContinent = asyncHandler(async (req, res) => {
  // console.time("getCitiesByContinent")
  const data = await Activity.aggregate([
    {
      $group: {
        _id: { $toUpper: "$continent" },
        cities: { $addToSet: { $toUpper: "$city" } }
      }
    },
    {
      $project: {
        _id: 0,
        continent: "$_id",
        cities: 1
      }
    }
  ])
  const capitalizedData = data.map(obj => {
    
    const words =  obj.continent.split(' ')
    obj.continent =words.map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase());
    const capitalizedCities = obj.cities.map(city => {
      const words = city.split(' ');
      const capitalizedWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase());
      return capitalizedWords.join(' ');
    });
    const citiesId = obj.cities.map(city => {
      return city.toLowerCase().replace(/\s/g, "");
    });
    return {
      cities: capitalizedCities,
      cities_id: citiesId,
      continent: obj.continent.join(' '),
      continent_id: obj.continent.join('-')
    };
  });
  // console.timeEnd("getCitiesByContinent")
  res.status(200).json(capitalizedData);
});


module.exports = {
  getAllActivities,
  createAnActivities,
  getCitiesByContinent,
};
