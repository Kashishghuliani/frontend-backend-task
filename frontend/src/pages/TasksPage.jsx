import React, { useEffect, useState } from "react";
import api from "../services/api";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";

export default function TasksPage() {
  const [tasks, setTasks] = useState([]);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const fetchTasks = () => {
    api
      .get("/tasks", { params: { search: query, status: statusFilter } })
      .then((res) => setTasks(res.data.tasks))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleSearch = () => fetchTasks();

  return (
    <div className="flex justify-center items-start min-h-screen pt-20">
      <div className="max-w-6xl w-full p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-6">Manage Tasks</h2>

        {/* Search & Filter Bar */}
        <div className="flex items-center gap-3 mb-6">
          <input
            placeholder="Search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="p-2 border rounded flex-1"
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="p-2 border rounded"
          >
            <option value="">All</option>
            <option value="todo">To do</option>
            <option value="in-progress">In progress</option>
            <option value="done">Done</option>
          </select>
          <button
            onClick={handleSearch}
            className="bg-blue-600 text-white px-3 py-2 rounded"
          >
            Search
          </button>
        </div>

        {/* Tasks + Form Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <TaskList tasks={tasks} refresh={fetchTasks} />
          </div>
          <div>
            <TaskForm refresh={fetchTasks} />
          </div>
        </div>
      </div>
    </div>
  );
}
