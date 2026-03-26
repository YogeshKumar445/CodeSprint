import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="text-center py-20">
      <h2 className="text-3xl font-bold mb-2">404</h2>
      <p className="text-gray-600 mb-4">Page not found</p>
      <Link to="/" className="text-indigo-600 underline">
        Go to Home
      </Link>
    </div>
  );
}