import { useState } from "react";
import api from "../services/api";
import toast from "react-hot-toast";

const initialForm = {
  title: "",
  difficulty: "Easy",
  tags: "",
  statement: "",
  constraints: "",
  points: 100,
};

export default function AdminAddProblemPage() {
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);

  const onChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        title: form.title.trim(),
        difficulty: form.difficulty,
        tags: form.tags.split(",").map(t => t.trim()).filter(Boolean),
        statement: form.statement.trim(),
        constraints: form.constraints.split("\n").map(c => c.trim()).filter(Boolean),
        examples: [],
        testCases: [],
        points: Number(form.points) || 100,
      };

      await api.post("/problems", payload);
      toast.success("Problem created successfully!");
      setForm(initialForm);
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to create problem");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white shadow rounded-lg p-6">
      <h1 className="text-2xl font-bold mb-4">Admin • Add Problem</h1>

      <form onSubmit={onSubmit} className="space-y-4">
        <input
          name="title"
          placeholder="Problem Title"
          value={form.title}
          onChange={onChange}
          className="w-full border rounded p-2"
          required
        />

        <select
          name="difficulty"
          value={form.difficulty}
          onChange={onChange}
          className="w-full border rounded p-2"
        >
          <option>Easy</option>
          <option>Medium</option>
          <option>Hard</option>
        </select>

        <input
          name="tags"
          placeholder="Tags (comma separated) e.g. Array, HashMap"
          value={form.tags}
          onChange={onChange}
          className="w-full border rounded p-2"
        />

        <textarea
          name="statement"
          placeholder="Problem statement"
          value={form.statement}
          onChange={onChange}
          className="w-full border rounded p-2"
          rows={6}
          required
        />

        <textarea
          name="constraints"
          placeholder="Constraints (one per line)"
          value={form.constraints}
          onChange={onChange}
          className="w-full border rounded p-2"
          rows={4}
        />

        <input
          name="points"
          type="number"
          min="0"
          value={form.points}
          onChange={onChange}
          className="w-full border rounded p-2"
        />

        <button
          disabled={loading}
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 disabled:opacity-60"
        >
          {loading ? "Creating..." : "Create Problem"}
        </button>
      </form>
    </div>
  );
}