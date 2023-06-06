const express = require("express");

const router = express.Router();
function isAuthenticated(req, res, next) {
  try {
    if (req.session.token) {
      next();
    } else {
      throw new Error("Please login");
    }
  } catch (error) {
    res.status(400).json({message: "Please login"});
  }
}
const contactDealer = require("../controllers/carSale");

router.get("/", isAuthenticated, contactDealer.getAllCar);

router.get("/:id", isAuthenticated, contactDealer.getSingleCar);

router.post("/", isAuthenticated, contactDealer.createCarSales);

router.put("/:id", isAuthenticated, contactDealer.updateCarSales);

router.delete("/:id", isAuthenticated, contactDealer.deleteCarSales);

module.exports = router;
