// importing the grocery item model
const Item = require("../models/GroceryItem");

const addItem = async (req, res) => {
  let { groceryItem, isPurchased } = req.body; // extracting the values from request body by object destructurng
  // capitalizing the string before saving into the database
  if (!isNaN(groceryItem)) {
    res.json({ message: "number not allowed as input" });
    return;
  }
  groceryItem =
    groceryItem[0].toUpperCase() + groceryItem.substring(1).toLowerCase();
  const item = new Item({ groceryItem, isPurchased }); // creating new item using the model with given vallues
  try {
    await item.save();
    res.status(201).json({ result: "success" });
  } catch (error) {
    res.status(500).json({
      result:
        "Couldn't add data to the database!" +
        `${error.code ? " error-code=" + error.code : ""}`,
    });
  }
};

const getAll = async (req, res) => {
  let items;
  try {
    items = await Item.find({}, "-__v"); // eliminating the __v field as it is not required
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({
      result:
        "Couldn't fetch data!" +
        `${error.code ? " error-code=" + error.code : ""}`,
    });
  }
};

const updatePurchaseStatus = async (req, res) => {
  try {
    let item = await Item.findById(req.body._id);
    item.isPurchased = req.body.isPurchased;
    await item.save();
    res.status(201).json({ result: "success" });
  } catch (error) {
    res.status(500).json({
      result:
        "Couldn't  update purchase status!" +
        `${error.code ? " error-code=" + error.code : ""}`,
    });
  }
};

const deleteGroceryItem = async (req, res) => {
  try {
    let item = await Item.findById(req.body._id);
    await item.remove();
    res.status(200).json({ result: "success" });
  } catch (error) {
    res.status(500).json({
      result:
        "Couldn't delete the item!" +
        `${error.code ? " error-code=" + error.code : ""}`,
    });
  }
};

module.exports = { addItem, getAll, updatePurchaseStatus, deleteGroceryItem };
