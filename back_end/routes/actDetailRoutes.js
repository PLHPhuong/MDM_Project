const express =require('express')
const router = express.Router()
const actDetailController = require('../controllers/actDetailController')

router.post('/',actDetailController.createAnActDetail)

module.exports = router