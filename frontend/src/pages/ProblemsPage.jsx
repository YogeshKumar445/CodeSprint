import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import toast from "react-hot-toast";

export default function ProblemsPage() {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const res = await api.get("/problems");
        setProblems(res.data.data || []);
      } catch (err) {
        const msg = err?.response?.data?.message || "Failed to load problems";
        setError(msg);
        toast.error(msg);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <p className="text-gray-600">Loading problems...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Problems</h2>
      {problems.length === 0 ? (
        <p className="text-gray-600">No problems found.</p>
      ) : (
        <div className="grid gap-3">
          {problems.map((p) => (
            <Link key={p._id} to={`/problems/${p._id}`} className="bg-white p-4 rounded shadow hover:shadow-md">
              <div className="flex justify-between">
                <h3 className="font-semibold">{p.title}</h3>
                <span className="text-sm">{p.difficulty}</span>
              </div>
              <p className="text-sm text-gray-600 mt-1">{(p.tags || []).join(", ")}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}