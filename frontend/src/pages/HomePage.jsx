import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="text-center py-16">
      <h1 className="text-4xl font-bold mb-4">Welcome to CodeSprint</h1>
      <p className="text-gray-600 mb-8">
        Practice DSA, submit code, and climb the leaderboard.
      </p>
      <Link
        to="/problems"
        className="px-5 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-700"
      >
        Explore Problems
      </Link>
    </div>
  );
}