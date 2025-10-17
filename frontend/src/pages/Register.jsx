import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    password_confirmation: "",

  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("http://127.0.0.1:8000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data);
        setLoading(false);
        return;
      }

      alert("Register berhasil! Silakan login.");
      navigate("/login");
    } catch (err) {
      setError("Terjadi kesalahan koneksi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-8 rounded-2xl w-full max-w-md space-y-4"
      >
        <h1 className="text-3xl font-bold mb-4 text-center">Register</h1>

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          className="w-full p-3 rounded bg-gray-700 focus:outline-none"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="username"
          placeholder="Username"
          className="w-full p-3 rounded bg-gray-700 focus:outline-none"
          value={formData.username}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full p-3 rounded bg-gray-700 focus:outline-none"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full p-3 rounded bg-gray-700 focus:outline-none"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <input
        type="password"
        name="password_confirmation"
        placeholder="Confirm Password"
        className="w-full p-3 rounded bg-gray-700 focus:outline-none"
        value={formData.password_confirmation}
        onChange={handleChange}
        required
        />

        {error && (
          <div className="text-red-400 text-sm bg-gray-700 p-2 rounded">
            {typeof error === "string"
              ? error
              : JSON.stringify(error, null, 2)}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 p-3 rounded font-semibold"
        >
          {loading ? "Processing..." : "Register"}
        </button>

        <p className="text-sm text-center text-gray-400 mt-2">
          Sudah punya akun?{" "}
          <button
            type="button"
            onClick={() => navigate("/login")}
            className="text-blue-400 hover:underline"
          >
            Login di sini
          </button>
        </p>
      </form>
    </div>
  );
}
