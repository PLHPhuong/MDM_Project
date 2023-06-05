const express =require('express')
const router = express.Router()
const test = require('../controllers/testController')


router.get('/',test.getAllAccommodations)
router.put('/',test.updateAnAccommodations)
router.delete('/',test.removeAnAccommodation)

module.exports = router