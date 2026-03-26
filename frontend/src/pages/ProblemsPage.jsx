import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

export default function ProblemsPage() {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await api.get("/problems");
        setProblems(res.data.data || []);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <p>Loading problems...</p>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Problems</h2>
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
    </div>
  );
}