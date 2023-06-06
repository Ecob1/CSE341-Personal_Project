const mongodb = require("../db/connect");
const ObjectId = require("mongodb").ObjectId;

// Creating a function to create a car sales.
const validateModels = ["Toyota", "Ford"];
const validCarSalesData = (data) => {
  const {Model, Year, RimSize, Color, EngineSize, Condition, Value} = data;
  if (
    !Model ||
    !Year ||
    !RimSize ||
    !Color ||
    !EngineSize ||
    !Condition ||
    !Value ||
    !Quantity
  ) {
    throw new Error("Make sure all required fields are fill out.");
  }
  if (!validateModels.includes(Model)) {
    throw new Error("Invalid car the model needs to be a Toyota or Ford only.");
  }
};

// Creating a function to get all the car Sales.
const getAllCar = async (req, res, next) => {
  const result = await mongodb
    .getDb()
    .db("Guero")
    .collection("carSales")
    .find();
  result.toArray().then((lists) => {
    console.log(lists);
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(lists);
  });
};

// Creating a function to get a single car Sales.
const getSingleCar = async (req, res, next) => {
  try {
    const userId = new ObjectId(req.params.id);
    const result = await mongodb
      .getDb()
      .db("Guero")
      .collection("carSales")
      .find({_id: userId});
    if (!result) {
      res.status(404).json({message: "Car sales not found"});
    }
    result.toArray().then((lists) => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(lists[0]);
    });
  } catch (error) {
    res.status(400).json({message: error.message});
  }
};

const createCarSales = async (req, res) => {
  try {
    validCarSalesData(req.body);
    const carInventory = {
      BuyerName: req.body.BuyerName,
      BuyerPhoneNumber: req.body.BuyerPhoneNumber,
      Model: req.body.Model,
      Year: req.body.Year,
      Color: req.body.Color,
      Value: req.body.Value,
      Quantity: req.body.Quantity,
      VimNumber: req.body.VimNumber,
    };
    const response = await mongodb
      .getDb()
      .db("Guero")
      .collection("carSales")
      .insertOne(carInventory);

    // If car sales not created error will show.
    if (!response) {
      res.status(500).json({message: "Car Sales not created."});
    }
    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res
        .status(500)
        .json(
          response.error || "Some error occurred while creating the car sales."
        );
    }
  } catch (error) {
    res.status(400).json({message: error.message});
  }
};

const updateCarSales = async (req, res) => {
  try {
    validCarSalesData(req.body);
    const userId = new ObjectId(req.params.id);
    // be aware of updateOne if you only want to update specific fields
    const carInventory = {
      BuyerName: req.body.BuyerName,
      BuyerPhoneNumber: req.body.BuyerPhoneNumber,
      Model: req.body.Model,
      Year: req.body.Year,
      Color: req.body.Color,
      Value: req.body.Value,
      Quantity: req.body.Quantity,
      VimNumber: req.body.VimNumber,
    };
    const response = await mongodb
      .getDb()
      .db("Guero")
      .collection("carSales")
      .replaceOne({_id: userId}, carInventory);
    if (!response) {
      res.status(404).json({message: "Id not found"});
    }
    if (response.acknowledged) {
      res.status(204).send();
    } else {
      res
        .status(500)
        .json(
          response.error || "Some error occurred while updating the car sales."
        );
    }
  } catch (error) {
    res.status(400).json({message: error.message});
  }
};

// This function is to delete car sales.
const deleteCarSales = async (req, res, next) => {
  try {
    const userId = new ObjectId(req.params.id);
    const result = await mongodb
      .getDb()
      .db("Guero")
      .collection("carSales")
      .deleteOne({_id: userId}, true);
    if (!result) {
      res.status(404).json({message: "Id not found"});
    }
    console.log(result);
    if (result.deletedCount > 0) {
      res.status(200).send();
    } else {
      res
        .status(500)
        .json(
          result.error || "Some error occurred while deleted the car sales."
        );
    }
  } catch (error) {
    res.status(500).json(err);
  }
};
module.exports = {
  getAllCar,
  getSingleCar,
  createCarSales,
  updateCarSales,
  deleteCarSales,
};
