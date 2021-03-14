const express = require("express");
const mongoose = require("mongoose");

// importing the router
const router = require("./routes/router");
const Item = require("./models/GroceryItem");

const PORT = 5000,
  url = //"mongodb://localhost/groceries";
    "mongodb+srv://rahit:simplePass@clusterrm.mqtgg.mongodb.net/groceries?retryWrites=true&w=majority";

const isDatabaseEmpty = async () => {
  const items = await Item.find({});
  return !items.length;
};

const populateDatabase = async () => {
  const dummyItems = require("./dummyItems.json");
  try {
    await Item.insertMany(dummyItems);
    console.log("dummy items added successfully");
  } catch (error) {
    console.log(error.message);
  }
};

// creating an instance of the express class
const app = express();

app.use(express.json()); // parses the incoming json data and then calls next() to pass on the control to the next middleware

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  next();
});

// using modular routes
app.use("/grocery", router);

app.use((req, res) => {
  res.status(404).json({ message: "page not found!" });
});

mongoose
  .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    console.log("connection  to db established successfully");
    // if database is empty then populate database with some initial data before staring the server
    if (await isDatabaseEmpty()) await populateDatabase();
    // starting the server if the connection to the db establishes successfully
    app.listen(PORT, () => {
      console.log("server up and running at port " + PORT);
    });
  })
  .catch((err) => {
    console.log(err.message);
  });
