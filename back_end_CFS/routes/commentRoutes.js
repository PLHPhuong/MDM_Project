const express =require('express')
const router = express.Router()
const commentController = require('../controllers/commentController')

router.post('/',commentController.createAComment)
router.get('/activity/:id',commentController.getCommentsByActivitiesId)


module.exports = router