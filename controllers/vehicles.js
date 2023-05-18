const mongodb = require("../db/connect");
const ObjectId = require("mongodb").ObjectId;
// Creating a function to get all the contacts.
const getAll = async (req, res, next) => {
  const result = await mongodb.getDb().db("Guero").collection("cars").find();

  result.toArray().then((lists) => {
    console.log(lists);
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(lists);
  });
};
// Creating a function to get a single contact.
const getSingle = async (req, res, next) => {
  const userId = new ObjectId(req.params.id);
  const result = await mongodb
    .getDb()
    .db("Guero")
    .collection("cars")
    .find({_id: userId});
  result.toArray().then((lists) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(lists[0]);
  });
};

// Creating a function to create a contact.
const createVehicle = async (req, res) => {
  const contact = {
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
    .insertOne(contact);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res
      .status(500)
      .json(
        response.error || "Some error occurred while creating the contact."
      );
  }
};

const updateVehicle = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  // be aware of updateOne if you only want to update specific fields
  const contact = {
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
    .replaceOne({_id: userId}, contact);
  if (response.acknowledged) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(
        response.error || "Some error occurred while updating the contact."
      );
  }
};

const deleteVehicle = async (req, res, next) => {
  const userId = new ObjectId(req.params.id);
  const result = await mongodb
    .getDb()
    .db("Guero")
    .collection("cars")
    .deleteOne({_id: userId}, true);
  console.log(result);
  if (result.deletedCount > 0) {
    res.status(200).send();
  } else {
    res
      .status(500)
      .json(result.error || "Some error occurred while deleted the contact.");
  }
};
module.exports = {
  getAll,
  getSingle,
  createVehicle,
  updateVehicle,
  deleteVehicle,
};
