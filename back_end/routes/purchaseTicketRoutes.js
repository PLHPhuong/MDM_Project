const express =require('express')
const router = express.Router()
const purchaseTicketController = require('../controllers/purchaseTicketController')


router.post('/',purchaseTicketController.createAPurchase)
router.put('/cancel/:id',purchaseTicketController.requestCancel)
router.patch('/:id',purchaseTicketController.acceptRequestCancel)
router.delete('/:id',purchaseTicketController.deleteAPurchase)
module.exports = router