import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await api.post("/auth/login", form);
      const { token, user } = res.data.data;
      login(token, user);
      navigate("/problems");
    } catch (err) {
      setError(err?.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      {error && <p className="text-red-600 mb-3">{error}</p>}
      <form onSubmit={onSubmit} className="space-y-3">
        <input name="email" type="email" placeholder="Email" className="w-full border p-2 rounded" onChange={onChange} required />
        <input name="password" type="password" placeholder="Password" className="w-full border p-2 rounded" onChange={onChange} required />
        <button disabled={loading} className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700">
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
      <p className="mt-3 text-sm">
        New user? <Link to="/signup" className="text-indigo-600">Signup</Link>
      </p>
    </div>
  );
}