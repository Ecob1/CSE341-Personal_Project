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
const contactsController = require("../controllers/vehicles");

router.get("/", contactsController.getAll);

router.get("/:id", contactsController.getSingle);

router.post("/", isAuthenticated, contactsController.createVehicle);

router.put("/:id", isAuthenticated, contactsController.updateVehicle);

router.delete("/:id", isAuthenticated, contactsController.deleteVehicle);

module.exports = router;
