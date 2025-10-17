import { useState } from "react";

export default function TaskForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return alert("Title is required");

    await onAdd({ title, description, deadline });
    setTitle("");
    setDescription("");
    setDeadline("");
  };

  return (
    <div className="bg-gray-800 p-8 rounded-2xl shadow-xl max-w-lg mx-auto mb-12">
      <h2 className="text-2xl font-bold text-center mb-4">Add New Task</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="p-3 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="p-3 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="date"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
          className="p-3 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 p-3 rounded text-white font-semibold transition"
        >
          Add Task
        </button>
      </form>
    </div>
  );
}
