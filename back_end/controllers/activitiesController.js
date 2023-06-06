const asyncHandler = require('express-async-handler')
const Activity = require('../models/activitiesModel')

// @desc Get all Activities
// @route GET /api/
// @access Private
const getAllActivities = asyncHandler (async (req,res)=>{
    res.status(200).json(await Activity.find())
})


module.exports = {
    getAllActivities
}