import { useState, useEffect } from "react";

import "./App.css";

import TextInput from "./components/textInput/TextInput.js";
import ListItem from "./components/listItem/ListItem.js";

import months from "./months.json";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [status, setStatus] = useState("Loading...");
  const [itemsArray, setItemsArray] = useState([]);
  const monthIndex = new Date().getMonth();

  useEffect(() => {
    getItems();
  }, []);

  const getItems = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:5000/grocery/getAll");
      const data = await response.json();
      setItemsArray(data);
      setIsLoading(false);
    } catch (error) {
      setStatus("Couldn't fetch data!");
      console.log(error.message);
    }
  };

  const postItem = async (groceryItem) => {
    if (!isNaN(groceryItem)) {
      alert("Number as item name not allowed!");
      return;
    }
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:5000/grocery/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ groceryItem, isPurchased: false }),
      });
      const data = await response.json();
      console.log(data);
      getItems();
    } catch (error) {
      setStatus("Couldn't post data!");
      console.log(error.message);
    }
  };

  const updateItem = async (_id) => {
    setIsLoading(true);
    try {
      await fetch("http://localhost:5000/grocery/updatePurchaseStatus", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ _id, isPurchased: true }),
      });
      getItems();
    } catch (error) {
      console.log(error.message);
    }
  };

  const deleteItem = async (_id) => {
    setIsLoading(true);
    try {
      await fetch("http://localhost:5000/grocery/deleteGroceryItem", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ _id }),
      });
      getItems();
    } catch (error) {
      console.log(error.message);
    }
  };

  const keyPressHandler = (event) => {
    if (event.keyCode === 13) {
      postItem(event.target.value);
    }
  };

  return (
    <div className="app">
      <h1 className="app-header">Monthly Grocery Planning App</h1>
      <h1 className="list-header">
        Plan for the month of {months[monthIndex]}
      </h1>
      <TextInput keyPressHandler={keyPressHandler} />
      <div className="list-body">
        {isLoading ? (
          <p>{status}</p>
        ) : (
          itemsArray.map((item) => {
            return (
              <ListItem
                key={item._id}
                item={item}
                updateItem={updateItem}
                deleteItem={deleteItem}
              />
            );
          })
        )}
        {!isLoading && itemsArray.length === 0 ? (
          <h2>There is no item in the list!</h2>
        ) : null}
      </div>
    </div>
  );
}

export default App;
