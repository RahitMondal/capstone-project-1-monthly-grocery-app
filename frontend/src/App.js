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
      if (!Array.isArray(data)) throw new Error("something went wrong!");
      setItemsArray(data);
      setIsLoading(false);
    } catch (error) {
      setStatus("Couldn't fetch data! Maybe backend server is down");
      console.log(error.message);
    }
  };

  const postItem = async (groceryItem) => {
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:5000/grocery/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ groceryItem, isPurchased: false }),
      });
      const data = await response.json();
      console.log(data);
      if (data.result !== "success") {
        setStatus(data.result);
        setTimeout(getItems, 3000);
        return;
      }
      getItems();
    } catch (error) {
      setStatus("Couldn't post data! Maybe backend server is down");
      console.log(error.message);
    }
  };

  const updateItem = async (_id) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        "http://localhost:5000/grocery/updatePurchaseStatus",
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ _id, isPurchased: true }),
        }
      );
      const data = await response.json();
      console.log(data);
      if (data.result !== "success") {
        setStatus(data.result);
        setTimeout(getItems, 3000);
        return;
      }
      getItems();
    } catch (error) {
      setStatus("Couldn't update data! Maybe backend server is down");
      console.log(error.message);
    }
  };

  const deleteItem = async (_id) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        "http://localhost:5000/grocery/deleteGroceryItem",
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ _id }),
        }
      );
      const data = await response.json();
      console.log(data);
      if (data.result !== "success") {
        setStatus(data.result);
        setTimeout(getItems, 3000);
        return;
      }
      getItems();
    } catch (error) {
      setStatus("Couldn't delete data! Maybe backend server is down");
      console.log(error.message);
    }
  };

  const keyPressHandler = (event) => {
    if (event.keyCode === 13) {
      if (!isNaN(event.target.value)) {
        alert("Please enter a valid item name!");
        return;
      }
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
          <h2>{status}</h2>
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
