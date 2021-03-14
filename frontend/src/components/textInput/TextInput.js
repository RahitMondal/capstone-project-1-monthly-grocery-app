import { useState } from "react";

import "./TextInput.css";

const TextInput = ({ keyPressHandler }) => {
  const [inputValue, setInputValue] = useState("");

  const changeHandler = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <input
      type="text"
      value={inputValue}
      placeholder="Add Shopping Item"
      onChange={changeHandler}
      onKeyUp={(event) => {
        if (event.keyCode === 13) setInputValue("");
        keyPressHandler(event);
      }}
    />
  );
};

export default TextInput;
