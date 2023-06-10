const express =require('express')
const router = express.Router()
const attractionController = require('../../controllers/serviceController/attractionController')

router.get('/:id',attractionController.getAnActtraction)
router.post('/',attractionController.createAnActtraction)

module.exports = router