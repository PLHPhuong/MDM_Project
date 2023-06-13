const asyncHandler = require('express-async-handler')


// @desc Get all Accommodations
// @route GET /api/accommodations
// @access Private
const getAllAccommodations = asyncHandler (async (req,res)=>{
    res.status(200).json({message: `Get accommodations!` })
})

// @desc Get all Accommodations
// @route GET /api/accommodations
// @access Private
const updateAnAccommodations = asyncHandler (async (req,res)=>{
    if (!req.body.Text){
        res.status(400)
        throw new Error('Missng "Text" field')
    }
    res.status(200).json({message: `Get accommodations! ${req.body.Text}` })
})


// @desc Get all Accommodations
// @route DELETE /api/accommodations
// @access Private
const removeAnAccommodation = asyncHandler (async (req,res)=>{
    res.status(200).json({message: 'Remove accommodations!'})
})
module.exports = {
    getAllAccommodations,
    updateAnAccommodations,
    removeAnAccommodation,
    
}