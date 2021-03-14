import "./ListItem.css";

const ListItem = ({ item, updateItem, deleteItem }) => {
  const { groceryItem, isPurchased, _id } = item;
  return (
    <div className="list-item">
      <div className={isPurchased ? "line-through" : ""}>{groceryItem}</div>
      <div className="btn-wrapper">
        <button
          className="purchased-btn"
          onClick={() => {
            updateItem(_id);
          }}
        >
          Purchased
        </button>
        <button
          className="delete-btn"
          onClick={() => {
            deleteItem(_id);
          }}
        >
          &times;
        </button>
      </div>
    </div>
  );
};

export default ListItem;
