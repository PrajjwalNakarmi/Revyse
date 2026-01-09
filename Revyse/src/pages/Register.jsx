import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../services/authService";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser({ name, email, password });
      navigate("/login");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 max-w-5xl w-full bg-white rounded-2xl shadow overflow-hidden">

        {/* LEFT BRANDING */}
        <div className="hidden md:flex flex-col justify-center px-12 py-16 bg-gradient-to-br from-indigo-500 to-purple-600 text-white">
          <h1 className="text-3xl font-bold mb-6">Revyse</h1>

          <p className="text-sm leading-relaxed mb-10 text-indigo-100">
            Create your account and start building smarter CVs with AI.
          </p>

          <ul className="space-y-4 text-sm">
            <li className="flex items-center gap-3">
              <span className="w-6 h-6 flex items-center justify-center bg-green-500 rounded-full text-xs font-bold">✓</span>
              Upload & Analyze CVs
            </li>
            <li className="flex items-center gap-3">
              <span className="w-6 h-6 flex items-center justify-center bg-green-500 rounded-full text-xs font-bold">✓</span>
              Job Matching
            </li>
            <li className="flex items-center gap-3">
              <span className="w-6 h-6 flex items-center justify-center bg-green-500 rounded-full text-xs font-bold">✓</span>
              AI CV Generation
            </li>
          </ul>
        </div>

        {/* RIGHT FORM */}
        <div className="px-8 py-12 md:px-12 flex flex-col justify-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Create Account
          </h2>
          <p className="text-sm text-gray-500 mb-6">
            Register to get started with Revyse
          </p>

          {error && (
            <p className="text-sm text-red-500 mb-4">{error}</p>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Full Name
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Email
              </label>
              <input
                type="email"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Password
              </label>
              <input
                type="password"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 transition"
            >
              Register
            </button>
          </form>

          <p className="text-sm text-gray-500 mt-6 text-center">
            Already have an account?{" "}
            <Link to="/login" className="text-indigo-600 font-semibold">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
