import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";

export default function ProblemDetailPage() {
  const { id } = useParams();
  const [problem, setProblem] = useState(null);
  const [code, setCode] = useState("function solve(){\n  return [0,1];\n}");
  const [language, setLanguage] = useState("javascript");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const res = await api.get(`/problems/${id}`);
        setProblem(res.data.data);
      } catch (err) {
        setError(err?.response?.data?.message || "Failed to load problem");
      }
    })();
  }, [id]);

  const submitCode = async () => {
    setError("");
    setResult(null);
    try {
      const res = await api.post("/submissions", { problemId: id, language, code });
      setResult(res.data.data);
    } catch (err) {
      setError(err?.response?.data?.message || "Submission failed");
    }
  };

  if (!problem) return <p>{error || "Loading problem..."}</p>;

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-2xl font-bold">{problem.title}</h2>
        <p className="text-sm text-gray-500 mt-1">{problem.difficulty}</p>
        <p className="mt-4 whitespace-pre-line">{problem.statement}</p>
      </div>

      <div className="bg-white p-4 rounded shadow">
        <h3 className="font-semibold mb-2">Code Editor</h3>
        <select className="border p-2 rounded mb-2" value={language} onChange={(e) => setLanguage(e.target.value)}>
          <option value="javascript">JavaScript</option>
          <option value="cpp">C++</option>
          <option value="java">Java</option>
          <option value="python">Python</option>
        </select>
        <textarea
          rows={12}
          className="w-full border rounded p-2 font-mono"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
        <button onClick={submitCode} className="mt-3 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
          Submit
        </button>

        {error && <p className="text-red-600 mt-3">{error}</p>}
        {result && (
          <div className="mt-3 p-3 rounded bg-gray-50 border">
            <p><b>Verdict:</b> {result.verdict}</p>
            <p><b>Score:</b> {result.score}</p>
            <p><b>Execution Time:</b> {result.executionTimeMs} ms</p>
          </div>
        )}
      </div>
    </div>
  );
}