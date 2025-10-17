import { useEffect, useState } from "react";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("All");
  const [sort, setSort] = useState("asc");
  const token = localStorage.getItem("token");

  const fetchTasks = async () => {
    const res = await fetch("http://127.0.0.1:8000/api/tasks", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setTasks(data);
  };

  const addTask = async (task) => {
    await fetch("http://127.0.0.1:8000/api/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(task),
    });
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await fetch(`http://127.0.0.1:8000/api/tasks/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchTasks();
  };

  const updateTask = async (id, updateData) => {
    await fetch(`http://127.0.0.1:8000/api/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updateData),
    });
    fetchTasks();
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const filteredTasks =
    filter === "All"
      ? tasks
      : tasks.filter((task) => task.status === filter);

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (!a.deadline) return 1;
    if (!b.deadline) return -1;
    const dateA = new Date(a.deadline);
    const dateB = new Date(b.deadline);
    return sort === "asc" ? dateA - dateB : dateB - dateA;
  });

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Task Dashboard</h1>

      <TaskForm onAdd={addTask} />

      <div className="flex justify-between mb-6">
        <div className="flex gap-3">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="bg-gray-800 p-2 rounded"
          >
            <option value="All">All</option>
            <option value="To Do">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </select>

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="bg-gray-800 p-2 rounded"
          >
            <option value="asc">Deadline ↑</option>
            <option value="desc">Deadline ↓</option>
          </select>
        </div>

        <button
          onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "/login";
          }}
          className="absolute top-6 right-8 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md font-semibold transition-all"

        >
          Logout
        </button>
      </div>

   
    <TaskList
    tasks={sortedTasks.map((t) => ({
    id: t.task_id, 
    title: t.title,
    description: t.description,
    status: t.status,
    deadline: t.deadline,
    }))}
    onDelete={deleteTask}
    onUpdate={updateTask}
    />

    </div>
  );
}
