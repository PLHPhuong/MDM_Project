const express =require('express')
const router = express.Router()
const activitiesController = require('../controllers/activitiesController')

router.get('/',activitiesController.getAllActivities)
router.post('/',activitiesController.createAnActivities)

module.exports = router