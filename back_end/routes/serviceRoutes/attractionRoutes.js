const express = require("express");
const router = express.Router();
const attractionController = require("../../controllers/serviceController/attractionController");

router.get("/", attractionController.getAllActtractions);
router.get("/:id", attractionController.getAnActtraction);
router.post("/", attractionController.createAnActtraction);
router.put("/:id", attractionController.updateAnActtraction);

module.exports = router;
