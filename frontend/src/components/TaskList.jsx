import React from 'react';
import api from '../services/api';

export default function TaskList({ tasks = [], refresh }) {
  const del = async (id) => {
    if (!confirm('Delete?')) return;
    try {
      await api.delete(`/tasks/${id}`);
      refresh();
    } catch (err) {
      console.error('Delete error:', err.response || err);
      alert('Delete failed');
    }
  };

  const toggleStatus = async (task) => {
    console.log('Toggling task:', task._id, 'current status:', task.status);

    const next = task.status === 'done' ? 'todo' : 'done';
    try {
      const res = await api.put(`/tasks/${task._id}`, { status: next });
      console.log('Toggle response:', res.data);
      refresh();
    } catch (err) {
      console.error('Toggle error:', err.response || err);
      if (err.response?.status === 401) alert('Unauthorized. Please login again.');
      else if (err.response?.status === 404) alert('Task not found or you cannot edit this task.');
      else alert('Update failed');
    }
  };

  return (
    <div className="space-y-4 p-4">
      {tasks.length === 0 && (
        <div className="bg-gray-50 p-6 rounded-xl shadow text-gray-500 text-center">
          No tasks
        </div>
      )}

      {tasks.map((t) => (
        <div
          key={t._id}
          className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0 md:space-x-4"
        >
          <div className="flex-1">
            <h4 className="font-bold text-lg text-gray-800">{t.title}</h4>
            <p className="text-gray-600 mt-1">{t.description}</p>
            <span
              className={`mt-2 inline-block px-3 py-1 text-xs font-medium rounded-full ${
                t.status === 'done' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
              }`}
            >
              {t.status.toUpperCase()}
            </span>
          </div>

          <div className="flex space-x-2">
            <button
              onClick={() => toggleStatus(t)}
              className="px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition"
            >
              Toggle
            </button>
            <button
              onClick={() => del(t._id)}
              className="px-4 py-2 bg-red-100 text-red-600 rounded-xl hover:bg-red-200 transition"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
