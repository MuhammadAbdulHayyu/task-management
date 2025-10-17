import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://127.0.0.1:8000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Login failed");

      localStorage.setItem("token", data.token);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <form onSubmit={handleSubmit} className="bg-gray-800 p-8 rounded-2xl shadow-xl w-96 space-y-4">
        <h2 className="text-2xl font-bold text-center">Login</h2>

        <input type="email" name="email" placeholder="Email" onChange={handleChange} className="w-full p-2 rounded bg-gray-700" />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} className="w-full p-2 rounded bg-gray-700" />

        {error && <p className="text-red-400 text-sm">{error}</p>}
        <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 p-2 rounded">Login</button>

        <p className="text-sm text-center">
          Don't have an account? <a href="/register" className="text-blue-400 underline">Register</a>
        </p>
      </form>
    </div>
  );
}
