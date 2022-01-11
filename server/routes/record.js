const express = require("express");

//recordRoutes instance of express router
const recordRoutes = express.Router();

//connect to db
const dbo = require("../db/conn");

//convert strings to ObjectId
const ObjectId = require("mongodb").ObjectId;

//lists all records
recordRoutes.route("/record").get(function (req, res) {
  let db_connect = dbo.getDb("girls");
  db_connect
    .collection("records")
    .find({})
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

//get a single record
recordRoutes.route("/record/:id").get(function (req, res) {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId(req.params.id) };
  db_connect.collection("records").findOne(myquery, function (err, result) {
    if (err) throw err;
    res.json(result);
  });
});

//create a new record
recordRoutes.route("/record/add").post(function (req, res) {
  let db_connect = dbo.getDb();
  let myobj = {
    girl_name: req.body.girl_name,
    girl_contact: req.body.girl_contact,
    girl_level: req.body.girl_level,
  };
  db_connect.collection("records").insertOne(myobj, function (err, res) {
    if (err) throw err;
    response.json(res);
  });
});

//updates records
recordRoutes.route("/update/:id").post(function (req, response) {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId(req.params.id) };
  let newvalues = {
    $set: {
      girl_name: req.body.girl_name,
      girl_contact: req.body.girl_contact,
      girl_level: req.body.girl_level,
    },
  };
  db_connect
    .collection("records")
    .updateOne(myquery, newvalues, function (err, res) {
      if (err) throw err;
      console.log("One Girl Updated");
      response.json(res);
    });
});

//delete a record
recordRoutes.route("/:id").delete((req, response) => {
  let db_connect = dbo.getDb();
  let myobj = { _id: ObjectId(req.params.id) };
  db_connect.collection("records").deleteOne(myquery, function (err, res) {
    if (err) throw err;
    console.log("One Record Removed");
    response.status(obj);
  });
});

module.exports = recordRoutes;
