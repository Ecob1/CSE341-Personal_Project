const mongodb = require("../db/connect");
const ObjectId = require("mongodb").ObjectId;

// Creating a function to create a vehicle.
const validateModels = ["Toyota", "Ford"];
const validVehicleData = (data) => {
  const {Model, Year, RimSize, Color, EngineSize, Condition, Value} = data;
  if (
    !Model ||
    !Year ||
    !RimSize ||
    !Color ||
    !EngineSize ||
    !Condition ||
    !Value
  ) {
    throw new Error("Make sure all required fields are fill out.");
  }
  if (!validateModels.includes(Model)) {
    throw new Error("Invalid car model needs to be a Toyota or Ford");
  }
};

// Creating a function to get all the vehicles.
const getAll = async (req, res, next) => {
  const result = await mongodb.getDb().db("Guero").collection("cars").find();
  result.toArray().then((lists) => {
    console.log(lists);
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(lists);
  });
};
// Creating a function to get a single vehicle.
const getSingle = async (req, res, next) => {
  try {
    const userId = new ObjectId(req.params.id);
    const result = await mongodb
      .getDb()
      .db("Guero")
      .collection("cars")
      .find({_id: userId});
    if (!result) {
      res.status(404).json({message: "Vehicle not found"});
    }
    result.toArray().then((lists) => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(lists[0]);
    });
  } catch (error) {
    res.status(400).json({message: error.message});
  }
};

const createVehicle = async (req, res) => {
  try {
    validVehicleData(req.body);
    const vehicle = {
      Model: req.body.Model,
      Year: req.body.Year,
      RimSize: req.body.RimSize,
      Color: req.body.Color,
      EngineSize: req.body.EngineSize,
      Condition: req.body.Condition,
      Value: req.body.Value,
    };

    const response = await mongodb
      .getDb()
      .db("Guero")
      .collection("cars")
      .insertOne(vehicle);

    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res
        .status(500)
        .json(
          response.error || "Some error occurred while creating the vehicle."
        );
    }
  } catch (error) {
    res.status(400).json({message: error.message});
  }
};

const updateVehicle = async (req, res) => {
  try {
    validVehicleData(req.body);

    const userId = new ObjectId(req.params.id);
    // be aware of updateOne if you only want to update specific fields
    const vehicle = {
      Model: req.body.Model,
      Year: req.body.Year,
      RimSize: req.body.RimSize,
      Color: req.body.Color,
      EngineSize: req.body.EngineSize,
      Condition: req.body.Condition,
      Value: req.body.Value,
    };

    const response = await mongodb
      .getDb()
      .db("Guero")
      .collection("cars")
      .replaceOne({_id: userId}, vehicle);
    if (!response) {
      res.status(404).json({message: "Id not found"});
    }
    if (response.acknowledged) {
      res.status(204).send();
    } else {
      res
        .status(500)
        .json(
          response.error || "Some error occurred while updating the vehicle."
        );
    }
  } catch (error) {
    res.status(400).json({message: error.message});
  }
};

const deleteVehicle = async (req, res, next) => {
  try {
    const userId = new ObjectId(req.params.id);
    const result = await mongodb
      .getDb()
      .db("Guero")
      .collection("cars")
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
        .json(result.error || "Some error occurred while deleted the vehicle.");
    }
  } catch (error) {
    res.status(500).json(err);
  }
};
module.exports = {
  getAll,
  getSingle,
  createVehicle,
  updateVehicle,
  deleteVehicle,
};
