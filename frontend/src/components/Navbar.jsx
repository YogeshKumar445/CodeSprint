import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "null");

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="bg-white border-b shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold text-indigo-600">
          CodeSprint
        </Link>

        <div className="flex items-center gap-4">
          <Link to="/problems" className="hover:text-indigo-600">
            Problems
          </Link>
          <Link to="/leaderboard" className="hover:text-indigo-600">
            Leaderboard
          </Link>

          {token ? (
            <>
              <span className="text-sm text-gray-600">
                Hi, {user?.name || "User"}
              </span>
              <button
                onClick={logout}
                className="px-3 py-1 rounded bg-red-500 text-white hover:bg-red-600"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-indigo-600">
                Login
              </Link>
              <Link
                to="/signup"
                className="px-3 py-1 rounded bg-indigo-600 text-white hover:bg-indigo-700"
              >
                Signup
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}