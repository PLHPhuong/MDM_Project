const express =require('express')
const router = express.Router()
const activitiesController = require('../controllers/activitiesController')

router.get('/',activitiesController.getAllActivities)
router.post('/',activitiesController.createAnActivities)
router.get('/continent/city',activitiesController.getCitiesByContinent)
router.post('/search',activitiesController.searchActivies)
router.put('/:id/rating/:rating',activitiesController.updateRating)

module.exports = router