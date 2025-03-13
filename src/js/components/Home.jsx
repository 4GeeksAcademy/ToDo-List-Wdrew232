import React, { useState } from "react";
// Include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

// Create your first component
const Home = () => {
  const [items, setItems] = useState([]);
  const [input, setInput] = useState("");

  const AddItem = () => {
    if (input.trim() !== "") {
      setItems([...items, input]);
      setInput("");
    }
  };

  const DeleteItem = (index) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
  };

  return (
    <div className="text-center">
      <div className="todoList">
        <div className="header">
          <h1>ToDo's</h1>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Add a new task"
          />
          <button onClick={AddItem}>Add +</button>
        </div>
        <div className="List">
          <ul>
            {items.map((item, index) => (
              <li key={index} className="todo-item">
                {item}
                <button className="delete-btn" onClick={() => DeleteItem(index)}>
                  X
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Home;
