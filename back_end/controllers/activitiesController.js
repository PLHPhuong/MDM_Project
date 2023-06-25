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
  const result = (await Activity.find({ owner: req.params.id })) || {
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
    country,
    continent,
  } = req.body;

  const newItem = await Activity.create({
    name,
    short_description,
    image,
    duration,
    free_cancellation_available,
    city,
    country,
    continent,
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
        cities: { $addToSet: { $toUpper: "$city" } },
      },
    },
    {
      $project: {
        _id: 0,
        continent: "$_id",
        cities: 1,
      },
    },
  ]);
  const capitalizedData = data.map((obj) => {
    const words = obj.continent.split(" ");
    obj.continent = words.map(
      (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    );
    const capitalizedCities = obj.cities.map((city) => {
      const words = city.split(" ");
      const capitalizedWords = words.map(
        (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
      );
      return capitalizedWords.join(" ");
    });
    const citiesId = obj.cities.map((city) => {
      return city.toLowerCase().replace(/\s/g, "");
    });
    return {
      cities: capitalizedCities,
      cities_id: citiesId,
      continent: obj.continent.join(" "),
      continent_id: obj.continent.join("-"),
    };
  });
  // console.timeEnd("getCitiesByContinent")
  res.status(200).json(capitalizedData);
});

// @desc search activities
// @route POST /api/activities/search
// @access Private
const searchActivies = asyncHandler(async (req, res) => {
  const query = [];
  if (req.body.city)
    query.push({ $match: { city: { $regex: req.body.city, $options: "i" } } });
  else if (req.body["search-text"])
    query.push({
      $match: {
        $or: [
          { city: { $regex: req.body["search-text"], $options: "i" } },
          { country: { $regex: req.body["search-text"], $options: "i" } },
          { name: { $regex: req.body["search-text"], $options: "i" } },
          { continent: { $regex: req.body["search-text"], $options: "i" } },
        ],
      },
    });
  else
    query.push({
      $match: {},
    });

  function hasKeys(obj, keys) {
    return keys.every((key) => Object.keys(obj).includes(key));
  }

  if (hasKeys(req.body, ["selected-date"])) {
    query.push({
      $lookup: {
        from: "activity_detail",
        localField: "detail",
        foreignField: "_id",
        as: "detail",
      },
    });
    query.push({ $unwind: "$detail" });
    query.push({
      $project: {
        name: 1,
        short_description: 1,
        image: 1,
        duration: 1,
        city: 1,
        country: 1,
        continent: 1,
        average_cost: 1,
        rating: 1,
        free_cancellation_available: 1,
        detail: {
          available: 1,
        },
      },
    });
  }
  if (req.body["selected-date"]) {
    selected_date = new Date(req.body["selected-date"]);
    query.push({
      $match: {
        "detail.available": {
          $elemMatch: {
            start: { $lte: selected_date },
            end: { $gte: selected_date },
          },
        },
      },
    });
  }
  query.push({
    $project: {
      detail: 0,
    },
  });
  // console.log(query);
  const result = await Activity.aggregate(query);
  // console.log(result);
  // const result = condition.lenght <=1 ? await Activity.find(condition[0]) : await Activity.find({$and:condition})

  if (!result || result.lenght <= 0)
    return res.status(400).json({ message: "not found" });
  return res.status(200).json(result);
});
// @desc updated rating
// @route PUT /api/activities/:id/rating/:rating
// @access Private
const updateRating = asyncHandler(async (req, res) => {
  let result
  try {
    result = await Activity.findOneAndUpdate({_id:req.params.id},{rating:req.params.rating}, { new: true })
  } catch (error) {
    // throw new Error(error);
    console.log(error)
    return res.status(400).json({error:error});
  }
  return res.status(200).json(result);
});
// @desc Get user's activites
// @route Get /api/activities/user/:id/
// @access Private
const getUserActivities = asyncHandler(async (req, res) => {
  let result
  try {
    result = await Activity.find({owner:req.params.id})
  } catch (error) {
    // throw new Error(error);
    console.log(error)
    return res.status(400).json({error:error});
  }
  return res.status(200).json(result);
});

module.exports = {
  getAllActivities,
  createAnActivities,
  getCitiesByContinent,
  searchActivies,
  updateRating,
  getUserActivities,
};
