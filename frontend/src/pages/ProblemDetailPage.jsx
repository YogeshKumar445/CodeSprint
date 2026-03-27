import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../services/api";
import toast from "react-hot-toast";

export default function ProblemDetailPage() {
  const { id } = useParams();

  const [problem, setProblem] = useState(null);
  const [language, setLanguage] = useState("javascript");
  const [code, setCode] = useState("function solve(){\n  return [0,1];\n}");
  const [result, setResult] = useState(null);

  const [loadingProblem, setLoadingProblem] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProblem = async () => {
      setLoadingProblem(true);
      setError("");
      try {
        const res = await api.get(`/problems/${id}`);
        setProblem(res.data?.data || null);
      } catch (err) {
        const msg = err?.response?.data?.message || "Failed to load problem";
        setError(msg);
        toast.error(msg);
      } finally {
        setLoadingProblem(false);
      }
    };

    fetchProblem();
  }, [id]);

  const handleSubmit = async () => {
    setSubmitting(true);
    setResult(null);
    setError("");

    try {
      const payload = {
        problemId: id,
        language,
        code,
      };

      const res = await api.post("/submissions", payload);
      const submission = res.data?.data;
      setResult(submission);
      toast.success("Submission sent!");
    } catch (err) {
      const msg = err?.response?.data?.message || "Submission failed";
      setError(msg);
      toast.error(msg);
    } finally {
      setSubmitting(false);
    }
  };

  if (loadingProblem) {
    return <p className="text-gray-600">Loading problem...</p>;
  }

  if (error && !problem) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded">
        <p className="font-medium">Error: {error}</p>
        <Link to="/problems" className="underline text-sm mt-2 inline-block">
          Back to Problems
        </Link>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {/* Left: Problem details */}
      <section className="bg-white p-5 rounded-lg shadow">
        <div className="flex items-start justify-between gap-4">
          <h1 className="text-2xl font-bold">{problem?.title}</h1>
          <span className="text-xs px-2 py-1 rounded bg-gray-100 border">
            {problem?.difficulty}
          </span>
        </div>

        <p className="text-sm text-gray-500 mt-2">
          Tags: {(problem?.tags || []).join(", ") || "N/A"}
        </p>

        <div className="mt-5">
          <h2 className="font-semibold mb-2">Statement</h2>
          <p className="whitespace-pre-line text-gray-800">{problem?.statement}</p>
        </div>

        {!!problem?.constraints?.length && (
          <div className="mt-5">
            <h2 className="font-semibold mb-2">Constraints</h2>
            <ul className="list-disc pl-5 space-y-1 text-gray-800">
              {problem.constraints.map((c, idx) => (
                <li key={idx}>{c}</li>
              ))}
            </ul>
          </div>
        )}

        {!!problem?.examples?.length && (
          <div className="mt-5">
            <h2 className="font-semibold mb-2">Examples</h2>
            <div className="space-y-3">
              {problem.examples.map((ex, idx) => (
                <div key={idx} className="border rounded p-3 bg-gray-50">
                  <p>
                    <span className="font-medium">Input:</span> {ex.input}
                  </p>
                  <p>
                    <span className="font-medium">Output:</span> {ex.output}
                  </p>
                  {ex.explanation ? (
                    <p>
                      <span className="font-medium">Explanation:</span> {ex.explanation}
                    </p>
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* Right: Editor + submit */}
      <section className="bg-white p-5 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-3">Code Editor</h2>

        <label className="block text-sm mb-1">Language</label>
        <select
          className="w-full border rounded p-2 mb-3"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        >
          <option value="javascript">JavaScript</option>
          <option value="cpp">C++</option>
          <option value="java">Java</option>
          <option value="python">Python</option>
        </select>

        <label className="block text-sm mb-1">Your Code</label>
        <textarea
          rows={14}
          className="w-full border rounded p-3 font-mono text-sm"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Write your solution here..."
        />

        <button
          onClick={handleSubmit}
          disabled={submitting || !code.trim()}
          className="mt-3 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-60"
        >
          {submitting ? "Submitting..." : "Submit"}
        </button>

        {error && (
          <div className="mt-3 p-3 rounded border border-red-200 bg-red-50 text-red-700 text-sm">
            {error}
          </div>
        )}

        {result && (
          <div className="mt-4 p-4 rounded border bg-gray-50">
            <h3 className="font-semibold mb-2">Latest Submission Result</h3>
            <p>
              <span className="font-medium">Verdict:</span> {result.verdict}
            </p>
            <p>
              <span className="font-medium">Score:</span> {result.score}
            </p>
            <p>
              <span className="font-medium">Execution Time:</span>{" "}
              {result.executionTimeMs} ms
            </p>
            <p className="text-xs text-gray-500 mt-2">
              Submission ID: {result._id}
            </p>
          </div>
        )}
      </section>
    </div>
  );
}