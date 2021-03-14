const express = require("express");

// importing the controller exoports in controller variable
const controller = require("../contorllers/controller");

// creating an instance of the express.Router class which is a middleware itself
const router = express.Router();

// adding middlewares to specific endpoints
router.post("/add", controller.addItem);
router.get("/getAll", controller.getAll);
router.put("/updatePurchaseStatus", controller.updatePurchaseStatus);
router.delete("/deleteGroceryItem", controller.deleteGroceryItem);

// exporting the router middleware
module.exports = router;
