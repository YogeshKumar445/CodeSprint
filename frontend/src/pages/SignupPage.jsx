import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

export default function SignupPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post("/auth/signup", form);
      const { token, user } = res.data.data;
      login(token, user);
      toast.success("Signup successful!");
      navigate("/problems");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">Signup</h2>
      <form onSubmit={onSubmit} className="space-y-3">
        <input name="name" type="text" placeholder="Name" className="w-full border p-2 rounded" onChange={onChange} required />
        <input name="email" type="email" placeholder="Email" className="w-full border p-2 rounded" onChange={onChange} required />
        <input name="password" type="password" placeholder="Password" className="w-full border p-2 rounded" onChange={onChange} required />
        <button disabled={loading} className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 disabled:opacity-60">
          {loading ? "Creating..." : "Signup"}
        </button>
      </form>
      <p className="mt-3 text-sm">
        Already have account? <Link to="/login" className="text-indigo-600">Login</Link>
      </p>
    </div>
  );
}