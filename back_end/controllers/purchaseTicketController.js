const asyncHandler = require("express-async-handler");
const PurchaseTicket = require("../models/purchaseTicketModel");

// @desc Create an ticket's purchased
// @route POST /api/purchaseticket
// @access Private
const createAPurchase = asyncHandler(async (req, res) => {
  // console.time("createAnPurchase");
  const error = await PurchaseTicket.validate(req.body);
  if (error) {
    res.status(400).json(error.message);
  }
  const { buyer, activities, select_time, tickets, happen_on_date } = req.body;
  const result = await PurchaseTicket.create({
    buyer,
    activities,
    select_time,
    happen_on_date,
    tickets,
  });

  // console.timeEnd("createAnPurchase");
  res.status(200).json(result);
});

// @desc Get an ticket's purchased
// @route Get /api/purchaseticket/:id
// @access Private
const getAPurchase = asyncHandler(async (req, res) => {
  console.time("getAnPurchase");
  result = await PurchaseTicket.findbyId(req.params.id);
  if (!result) res.status(400).json({ message: "not found" });
  console.timeEnd("getAnPurchase");
  res.status(200).json(result);
});

// @desc request cancel ticket's purchased
// @route PUT /api/purchaseticket/cancel/:id
// @access Private
const requestCancel = asyncHandler(async (req, res) => {
  // console.time("requestCancel");
  result = await PurchaseTicket.findById(req.params.id);
  if (!result) res.status(400).json({ message: "not found" });
  else if (result.is_cancel == true)
    res.status(400).json({ message: "Cancel request already been execute" });

  result.cancel_request = req.body.cancel_request;
  await result.save();
  // console.timeEnd("requestCancel");

  res.status(200).json(result);
});

// @desc request cancel ticket's purchased
// @route PATCH /api/purchaseticket/cancel/:id
// @access Private
const acceptRequestCancel = asyncHandler(async (req, res) => {
  // console.time("acceptRequestCancel");
  result = await PurchaseTicket.findById(req.params.id);
  if (!result) res.status(400).json({ message: "not found" });
  else if (result.cancel_request == false)
    res.status(400).json({ message: "there are no cancel request" });
  result.is_cancel = true;
  await result.save();
  res.status(200).json(result);
  // console.timeEnd("acceptRequestCancel");
});

// @desc Delete an ticket's purchased
// @route Delete /api/purchaseticket/:id
// @access Private
const deleteAPurchase = asyncHandler(async (req, res) => {
  // console.time("deleteAnPurchase");
  const item = await PurchaseTicket.findById(req.params.id)
  if (!item)
    res.status(200).json({ message: "done" });
  else if (!item.cancel_request && !item.is_cancel)
    res.status(400).json({ message: "there are no cancel request or owner didnt approve" });
  await PurchaseTicket.findByIdAndDelete(req.params.id);
  // console.timeEnd("deleteAnPurchase");
  res.status(200).json({ message: "done" });
});

module.exports = {
  createAPurchase,
  getAPurchase,
  deleteAPurchase,
  requestCancel,
  acceptRequestCancel,
};
