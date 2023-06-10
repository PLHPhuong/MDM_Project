const asyncHandler = require("express-async-handler");
const purchaseTicket = require("../models/purchaseTicketModel");

// @desc Create an actitvity's detail
// @route POST /api/actdetail/
// @access Private
const createAnPurchase = asyncHandler(async (req, res) => {
  console.time("createAnPurchase");
  const error = await purchaseTicket.validate(req.body);
  if (error) {
    res.status(400).json(error.message);
  }
  const { buyer, activities, select_time, tickets } = req.body;
  const result = await purchaseTicket.create({
    buyer,
    activities,
    select_time,
    tickets,
  });

  console.timeEnd("createAnPurchase");
  res.status(200).json(result);
});

module.exports = {
  createAnPurchase,
};
