const express = require("express");

const router = express.Router();

const contactDealer = require("../controllers/carSale");

router.get("/", contactDealer.getAllCar);

router.get("/:id", contactDealer.getSingleCar);

router.post("/", contactDealer.createCarSales);

router.put("/:id", contactDealer.updateCarSales);

router.delete("/:id", contactDealer.deleteCarSales);

module.exports = router;
