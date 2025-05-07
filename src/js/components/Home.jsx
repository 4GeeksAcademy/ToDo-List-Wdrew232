import React, { useState, useEffect } from "react";

const API_URL = "https://playground.4geeks.com/todo/todos/milen";

const Home = () => {
  const [items, setItems] = useState([]);
  const [input, setInput] = useState("");

  // Load items from API or local storage
  useEffect(() => {
    fetch(API_URL)
      .then((response) => {
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        return response.json();
      })
      .then((data) => {
        console.log("API Response:", data); 
        setItems(Array.isArray(data) ? data : []);
        localStorage.setItem("todos", JSON.stringify(Array.isArray(data) ? data : []));
      })
      .catch((error) => {
        console.error("Error fetching todos:", error);
        const savedTodos = localStorage.getItem("todos");
        if (savedTodos) setItems(JSON.parse(savedTodos));
      });
  }, []);

  const AddItem = () => {
    if (input.trim() !== "") {
      const newItem = { label: input, done: false };

      fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newItem), 
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Added Todo Response:", data); 
          setItems(prevItems => [...prevItems, data]); 
          localStorage.setItem("todos", JSON.stringify([...items, data]));
        })
        .catch((error) => console.error("Error adding todo:", error));

      setInput("");
    }
  };

  const DeleteItem = (id) => {
    fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then(() => {
        console.log(`Deleted Todo ID: ${id}`); 
        setItems(prevItems => prevItems.filter(item => item.id !== id));
        localStorage.setItem("todos", JSON.stringify(items.filter(item => item.id !== id)));
      })
      .catch((error) => console.error("Error deleting todo:", error));
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
            {items.map((item) => (
              <li key={item.id} className="todo-item">
                {item.label}
                <button className="delete-btn" onClick={() => DeleteItem(item.id)}>
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
