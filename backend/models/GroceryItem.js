const mongoose = require("mongoose");

//creating the grocery item schema
const GroceryItemSchema = mongoose.Schema({
  groceryItem: { type: String, unique: true, required: true },
  isPurchased: { type: Boolean, required: true, default: false },
});

// creating grocery item model using the grocery item schema  and exporting the model
module.exports = mongoose.model("Item", GroceryItemSchema);
