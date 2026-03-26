import { useEffect, useState } from "react";
import api from "../services/api";

export default function LeaderboardPage() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    (async () => {
      const res = await api.get("/leaderboard?top=20");
      setRows(res.data.data || []);
    })();
  }, []);

  return (
    <div className="bg-white rounded shadow p-4">
      <h2 className="text-2xl font-bold mb-4">Leaderboard</h2>
      <div className="overflow-auto">
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">Rank</th>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Score</th>
              <th className="p-2 border">Solved</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.userId}>
                <td className="p-2 border text-center">{r.rank}</td>
                <td className="p-2 border">{r.name}</td>
                <td className="p-2 border text-center">{r.totalScore}</td>
                <td className="p-2 border text-center">{r.problemsSolved}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}