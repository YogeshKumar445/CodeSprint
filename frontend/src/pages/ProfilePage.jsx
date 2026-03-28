import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";
import toast from "react-hot-toast";

export default function ProfilePage() {
  const { user } = useAuth();
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMySubmissions = async () => {
      try {
        const res = await api.get("/submissions/my");
        setSubmissions(res.data?.data || []);
      } catch (err) {
        toast.error(err?.response?.data?.message || "Failed to load submissions");
      } finally {
        setLoading(false);
      }
    };

    fetchMySubmissions();
  }, []);

  return (
    <div className="space-y-6">
      {/* User Card */}
      <div className="bg-white shadow rounded-lg p-5">
        <h1 className="text-2xl font-bold mb-3">My Profile</h1>
        <p><span className="font-semibold">Name:</span> {user?.name || "N/A"}</p>
        <p><span className="font-semibold">Email:</span> {user?.email || "N/A"}</p>
      </div>

      {/* Submissions Table */}
      <div className="bg-white shadow rounded-lg p-5">
        <h2 className="text-xl font-semibold mb-4">My Submissions</h2>

        {loading ? (
          <p className="text-gray-600">Loading submissions...</p>
        ) : submissions.length === 0 ? (
          <p className="text-gray-600">No submissions yet.</p>
        ) : (
          <div className="overflow-auto">
            <table className="w-full border">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-2 border text-left">Problem</th>
                  <th className="p-2 border">Language</th>
                  <th className="p-2 border">Verdict</th>
                  <th className="p-2 border">Score</th>
                  <th className="p-2 border">Time</th>
                  <th className="p-2 border">Submitted At</th>
                </tr>
              </thead>
              <tbody>
                {submissions.map((s) => (
                  <tr key={s._id}>
                    <td className="p-2 border">{s.problem?.title || "Unknown"}</td>
                    <td className="p-2 border text-center">{s.language}</td>
                    <td className="p-2 border text-center">
                      <span
                        className={
                          s.verdict === "Accepted"
                            ? "text-green-600 font-medium"
                            : "text-red-600 font-medium"
                        }
                      >
                        {s.verdict}
                      </span>
                    </td>
                    <td className="p-2 border text-center">{s.score}</td>
                    <td className="p-2 border text-center">{s.executionTimeMs} ms</td>
                    <td className="p-2 border text-center">
                      {new Date(s.createdAt).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}