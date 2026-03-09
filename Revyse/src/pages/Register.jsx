import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../services/authService";

export default function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      await registerUser({
        name,
        email,
        password,
        phone
      });

      navigate("/login");

    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleRegister = () => {
    alert("Google registration not implemented yet");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">

      <div className="grid grid-cols-1 md:grid-cols-2 max-w-5xl w-full bg-white rounded-2xl shadow-lg overflow-hidden">

        {/* LEFT SIDE */}

        <div className="hidden md:flex flex-col justify-center px-12 py-16 bg-gradient-to-br from-indigo-600 to-purple-600 text-white">

          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 flex items-center justify-center bg-white text-indigo-600 rounded-lg font-bold">
              R
            </div>
            <h1 className="text-2xl font-bold">Revyse</h1>
          </div>

          <h2 className="text-xl font-semibold mb-4">
            Create Better Resumes with AI
          </h2>

          <p className="text-sm text-indigo-100 mb-8">
            Analyze your CV, improve it with AI suggestions, match with jobs and
            build ATS optimized resumes.
          </p>

          <ul className="space-y-4 text-sm">

            <li className="flex items-center gap-3">
              <span className="w-6 h-6 flex items-center justify-center bg-green-500 rounded-full text-xs font-bold">
                ✓
              </span>
              Resume analysis with ATS scoring
            </li>

            <li className="flex items-center gap-3">
              <span className="w-6 h-6 flex items-center justify-center bg-green-500 rounded-full text-xs font-bold">
                ✓
              </span>
              AI resume improvement suggestions
            </li>

            <li className="flex items-center gap-3">
              <span className="w-6 h-6 flex items-center justify-center bg-green-500 rounded-full text-xs font-bold">
                ✓
              </span>
              Job matching and resume builder
            </li>

          </ul>

        </div>


        {/* RIGHT FORM */}

        <div className="px-8 py-12 md:px-12 flex flex-col justify-center">

          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Create your account
          </h2>

          <p className="text-sm text-gray-500 mb-8">
            Start improving your resume today
          </p>

          {error && (
            <p className="text-red-500 text-sm mb-4">{error}</p>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Full Name
              </label>

              <input
                type="text"
                placeholder="John Doe"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>


            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Phone Number
              </label>

              <input
                type="tel"
                placeholder="+977 98XXXXXXXX"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>


            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Email Address
              </label>

              <input
                type="email"
                placeholder="you@example.com"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
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
                placeholder="Enter password"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>


            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Confirm Password
              </label>

              <input
                type="password"
                placeholder="Confirm password"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
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


          {/* Divider */}

          <div className="flex items-center my-6">
            <div className="flex-1 h-px bg-gray-300"></div>
            <span className="px-3 text-sm text-gray-400">OR</span>
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>


          {/* Google Register */}

          <button
            onClick={handleGoogleRegister}
            className="w-full border py-2 rounded-lg flex items-center justify-center gap-3 hover:bg-gray-50 transition"
          >
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google"
              className="w-5 h-5"
            />
            Continue with Google
          </button>


          <p className="text-sm text-gray-500 mt-6 text-center">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-indigo-600 font-semibold hover:underline"
            >
              Login
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
}