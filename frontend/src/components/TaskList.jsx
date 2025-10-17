import React, { useState } from "react";

export default function TaskList({ tasks, onDelete, onUpdate }) {
  const [editingTask, setEditingTask] = useState(null);
  const [editForm, setEditForm] = useState({
    title: "",
    description: "",
    status: "",
    deadline: "",
  });

  const statusColors = {
    "To Do": "bg-gray-600",
    "In Progress": "bg-yellow-500",
    "Done": "bg-green-500",
  };

  const handleStatusChange = (task, newStatus) => {
    onUpdate(task.id, { status: newStatus });
  };

  const handleEditClick = (task) => {
    setEditingTask(task);
    setEditForm({
      title: task.title,
      description: task.description,
      status: task.status,
      deadline: task.deadline ? task.deadline.split("T")[0] : "",
    });
  };

  const handleChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    onUpdate(editingTask.id, editForm);
    setEditingTask(null);
  };

  return (
    <div className="space-y-4 mt-4">
      {tasks.map((task) => (
        <div
          key={task.id}
          className="bg-[#252A36] p-4 rounded-lg flex justify-between items-start text-white shadow-sm hover:shadow-md transition-shadow"
        >
          <div>
            <h3 className="text-lg font-semibold">{task.title}</h3>
            <p className="text-gray-400">{task.description}</p>
            {task.deadline && (
              <p className="text-sm text-gray-500 mt-1">
                Deadline: {new Date(task.deadline).toLocaleDateString()}
              </p>
            )}
          </div>
          <div className="flex flex-col items-end gap-2">
            <div className="flex gap-2">
              {["To Do", "In Progress", "Done"].map((status) => (
                <button
                  key={status}
                  onClick={() => handleStatusChange(task, status)}
                  className={`px-3 py-1 rounded text-sm font-semibold transition ${
                    task.status === status
                      ? statusColors[status]
                      : "bg-gray-700 hover:bg-gray-600"
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>

            <div className="flex gap-2 mt-2">
              <button
                onClick={() => handleEditClick(task)}
                className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-sm"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(task.id)}
                className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-sm"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}

      {tasks.length === 0 && (
        <p className="text-gray-500 text-center mt-6">
          Belum ada task yang tersedia.
        </p>
      )}
      
      {editingTask && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-[#1E2430] p-6 rounded-xl w-[400px] space-y-4 shadow-lg text-white">
            <h2 className="text-xl font-bold text-center mb-2">Edit Task</h2>

            <input
              type="text"
              name="title"
              value={editForm.title}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-700 text-white"
              placeholder="Title"
            />

            <textarea
              name="description"
              value={editForm.description}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-700 text-white"
              placeholder="Description"
            ></textarea>

            <select
              name="status"
              value={editForm.status}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-700 text-white"
            >
              <option value="To Do">To Do</option>
              <option value="In Progress">In Progress</option>
              <option value="Done">Done</option>
            </select>

            <input
              type="date"
              name="deadline"
              value={editForm.deadline}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-700 text-white"
            />

            <div className="flex justify-between mt-4">
              <button
                onClick={() => setEditingTask(null)}
                className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
