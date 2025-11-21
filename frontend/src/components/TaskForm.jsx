import React, { useState } from "react";
import api from "../services/api";

export default function TaskForm({ refresh }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("todo");

  const submit = () => {
    if (!title.trim()) return alert("Task title required");

    api
      .post("/tasks", { title, description, status })
      .then(() => {
        setTitle("");
        setDescription("");
        setStatus("todo");
        refresh();
      })
      .catch((err) =>
        alert(err.response?.data?.error || "Failed to create task")
      );
  };

  return (
    <div className="bg-gray-50 p-6 rounded-lg shadow-md border">
      <h3 className="text-lg font-semibold mb-3 text-gray-800">
        Create New Task
      </h3>

      <input
        placeholder="Task Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-2 border rounded mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full p-2 border rounded mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        rows="3"
      />

      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="w-full p-2 border rounded mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="todo">To do</option>
        <option value="in-progress">In progress</option>
        <option value="done">Done</option>
      </select>

      <button
        onClick={submit}
        className="w-full bg-green-600 hover:bg-green-700 transition text-white p-2 rounded font-medium"
      >
        Add Task
      </button>
    </div>
  );
}
