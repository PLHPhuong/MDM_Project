const express =require('express')
const router = express.Router()
const purchaseTicketController = require('../controllers/purchaseTicketController')

router.post('/',purchaseTicketController.createAnPurchase)

module.exports = router