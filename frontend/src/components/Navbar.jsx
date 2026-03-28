import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-white border-b shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold text-indigo-600">CodeSprint</Link>

        <div className="flex items-center gap-4">
          <Link to="/problems">Problems</Link>
          <Link to="/leaderboard">Leaderboard</Link>

          {isAuthenticated ? (
            <>
              <Link to="/profile" className="hover:text-indigo-600">Profile</Link>
              <span className="text-sm text-gray-600">Hi, {user?.name}</span>
              <button onClick={handleLogout} className="px-3 py-1 rounded bg-red-500 text-white">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/signup" className="px-3 py-1 rounded bg-indigo-600 text-white">Signup</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}