const asyncHandler = require("express-async-handler");
const Activity = require("../../models/activitiesModel");
const ActDetail = require("../../models/actDetailModel");
const mongoose = require("mongoose");
const _ = require("lodash");
const populate_ActDetail_aggregate = [
  {
    $lookup: {
      from: "activity_detail",
      localField: "detail",
      foreignField: "_id",
      as: "detail",
    },
  },
  {
    $unwind: "$detail",
  },
  {
    $addFields: {
      pick_up_included: "$detail.pick_up_included",
      refundable: "$detail.refundable",
      description: "$detail.description",
      included: "$detail.included",
      not_included: "$detail.not_included",
      accessibility: "$detail.accessibility",
      health_safety: "$detail.health_safety",
      whyvisit: "$detail.whyvisit",
      restriction: "$detail.restriction",
      languages: "$detail.languages",
      additional_information: "$detail.additional_information",
      location_departure: "$detail.location_departure",
      location_end: "$detail.location_end",
      itinerary_stops: "$detail.itinerary_stops",
      available: "$detail.available",
      ticket: "$detail.ticket",
      detailCreatedAt: "$detail.createdAt",
      detailUpdatedAt: "$detail.updatedAt",
      detail__v: "$detail.__v",
    },
  }, 
  {
    $project: {
      detail: 0,
    },
  },
];

// @desc Get all actractions
// @route GET /api/attraction
// @access Private
const getAllActtractions = asyncHandler(async (req, res) => {
  const item = await Activity.find({});
  const result = item ? item : { message: "not found" };

  // console.timeEnd("getAnActtraction");

  return res.status(200).json(result);
});

// @desc Get an actraction
// @route GET /api/attraction/id
// @access Private
const getAnActtraction = asyncHandler(async (req, res) => {
  // console.time("getAnActtraction"); // Start the timer
  // // Solution 1 //////////////////////////////////////////////////////////////////////
  // const item = await Activity.findById(req.params.id);
  // let result; //= !item ? { message: "not found" } : await item.populate("detail");
  // if (!item) {
  //   result = { message: "not found" };
  // } else {
  //   const temp = item;
  //   await item.populate("detail");
  //   const { detail, ...rest } = item.toObject();
  //   detail.detailCreatedAt = detail.createdAt;
  //   detail.detailupdatedAt = detail.updatedAt;
  //   result = { ...rest, ...detail };
  // }
  // Solution 2 //////////////////////////////////////////////////////////////////////

  const item = await Activity.aggregate([
    { $match: { _id: new mongoose.Types.ObjectId(req.params.id) } },
    ...populate_ActDetail_aggregate,
  ]);
  const result = item ? item : { message: "not found" };

  // console.timeEnd("getAnActtraction");

  return res.status(200).json(result);
});

// @desc Create an actraction
// @route POST /api/attraction/
// @access Private
const createAnActtraction = asyncHandler(async (req, res) => {
  // console.time("createAnActtraction");
  const errorActDetail = await ActDetail.validate(req.body);
  if (errorActDetail) {
    res.status(400).json(errorActDetail.message);
  }
  const errorActivity = await Activity.validate(req.body);
  if (errorActDetail) {
    res.status(400).json(errorActivity.message);
  }

  // const {
  //   pick_up_included,
  //   description,
  //   included,
  //   not_included,
  //   accessibility,
  //   health_safety,
  //   languages,
  //   additional_information,
  //   location_departure,
  //   location_end,
  //   itinerary_stops,
  //   available,
  //   ticket,
  // } = req.body;

  // const newActDetailItem = await ActDetail.create({
  //   pick_up_included,
  //   description,
  //   included,
  //   not_included,
  //   accessibility,
  //   health_safety,
  //   languages,
  //   additional_information,
  //   location_departure,
  //   location_end,
  //   itinerary_stops,
  //   available,
  //   ticket,
  // });
  const newActDetailItem = await ActDetail.create(req.body);

  const {
    name,
    short_description,
    image,
    duration,
    free_cancellation_available,
    city,
    country,
    continent,
    owner,
  } = req.body;

  let newItemActivity = null;
  try {
    newItemActivity = await Activity.create({
      name,
      short_description,
      image,
      duration,
      free_cancellation_available,
      city,
      country,
      continent,
      owner,
      detail: newActDetailItem._id,
    });
    // newItemActivity =  await Activity.create(req.body)
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
    return;
  }

  const tempdetail = newActDetailItem.toObject();
  const tempactivites = newItemActivity.toObject();
  tempdetail["detailCreatedAt"] = tempdetail.createdAt;
  tempdetail["detailUpdatedAt"] = tempdetail.updatedAt;
  delete tempdetail.createdAt;
  delete tempdetail.updatedAt;

  result = _.merge(tempactivites, tempdetail);
  // console.timeEnd("createAnActtraction");

  res.status(200).json(result);
});

const updateAnActtraction = asyncHandler(async (req, res) => {
  // console.time("updateAnActtraction");

  const item = await Activity.findById(req.params.id);

  if (!item) {
    return res.status(404).send();
  }

  //Update activity document
  const updatedItem = await Activity.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: false }
  );
  const updateItemDetail = await ActDetail.findByIdAndUpdate(
    item.detail,
    req.body,
    { new: false }
  );
  // console.timeEnd("updateAnActtraction");
  // const tempdetail = updateItemDetail.toObject();
  // tempdetail["detailCreatedAt"] = tempdetail.createdAt;
  // tempdetail["detailUpdatedAt"] = tempdetail.updatedAt;
  // delete tempdetail.createdAt;
  // delete tempdetail.updatedAt;
  // return res.status(200).json({ ...updatedItem.toObject(), ...tempdetail });

  const result = await Activity.aggregate([
    { $match: { _id: new mongoose.Types.ObjectId(req.params.id) } },
    ...populate_ActDetail_aggregate,
  ]);
  return res.status(200).json(result);
});

module.exports = {
  getAllActtractions,
  getAnActtraction,
  createAnActtraction,
  updateAnActtraction,
};
