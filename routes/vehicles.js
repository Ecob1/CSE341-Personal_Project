const express = require("express");
const router = express.Router();

const contactsController = require("../controllers/vehicles");

router.get("/", contactsController.getAll);

router.get("/:id", contactsController.getSingle);

router.post("/", contactsController.createVehicle);

router.put("/:id", contactsController.updateVehicle);

router.delete("/:id", contactsController.deleteVehicle);

module.exports = router;
