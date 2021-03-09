var express = require("express");

//import model burger.js to use its db functions
var burger = require("../models/burger.js");

var router = express.Router();

//making route to get data from server
router.get("/", function(req, res) {
    burger.all(function(data) {
      var hbsObject = {
        name: data
      };
      console.log(hbsObject);
      res.render("index", hbsObject);
    });
  });
  
  //making route to submit new burger name to db
  router.post("/api/burgers", function(req, res) {
    burger.create([
      "name", "devoured"
    ], [
      req.body.name, req.body.devoured
    ], function(result) {
      // Send back the ID of the new quote
      res.json({ id: result.insertId });
    });
  });
  
  //making routes
  router.put("/api/burgers/:id", function(req, res) {
    var condition = "id = " + req.params.id;
  
    console.log("condition", condition);
  
    burger.update({
      devoured: req.body.devoured
    }, condition, function(result) {
      if (result.changedRows == 0) {
        // no rows changed = no ID
        return res.status(404).end();
      } else {
        res.status(200).end();
      }
    });
  });

  router.delete("/api/burgers/:id", function(req, res) {
    var condition = "id = " + req.params.id;
  
    burger.delete(condition, function(result) {
      if (result.affectedRows == 0) {
        // If no rows were changed, then the ID must not exist, so 404
        return res.status(404).end();
      } else {
        res.status(200).end();
      }
    });
  });
  
// Export routes for server.js to use.
module.exports = router;