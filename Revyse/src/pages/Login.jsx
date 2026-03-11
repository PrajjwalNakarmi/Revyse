import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser, registerUser } from "../services/authService";
import { auth, googleProvider } from "../services/firebase";
import { signInWithPopup } from "firebase/auth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await loginUser({ email, password });

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);

      const user = result.user;

      const googleUser = {
        name: user.displayName,
        email: user.email,
        password: user.uid
      };

      let data;

      try {
        data = await loginUser({
          email: googleUser.email,
          password: googleUser.password
        });
      } catch {
        await registerUser(googleUser);

        data = await loginUser({
          email: googleUser.email,
          password: googleUser.password
        });
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      navigate("/dashboard");

    } catch (err) {
      console.error(err);
      setError("Google login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 max-w-4xl w-full bg-white rounded-2xl shadow overflow-hidden">

        <div className="hidden md:flex flex-col justify-center px-10 py-14 bg-gradient-to-br from-indigo-500 to-purple-600 text-white">
          <h1 className="text-3xl font-bold mb-6">Revyse</h1>

          <p className="text-sm leading-relaxed mb-10 text-indigo-100">
            AI-powered CV analysis and smart job matching to boost your career.
          </p>

          <ul className="space-y-4 text-sm">
            <li className="flex items-center gap-3">
              <span className="w-6 h-6 flex items-center justify-center bg-green-500 rounded-full text-xs font-bold">✓</span>
              CV Analysis & Insights
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

        <div className="px-8 py-12 flex flex-col justify-center">

          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Welcome Back
          </h2>

          <p className="text-sm text-gray-500 mb-6">
            Login to access your dashboard
          </p>

          {error && (
            <p className="text-sm text-red-500 mb-4">{error}</p>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">

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
              Login
            </button>

          </form>

          <div className="flex items-center my-6">
            <div className="flex-1 border-t"></div>
            <span className="px-3 text-sm text-gray-400">OR</span>
            <div className="flex-1 border-t"></div>
          </div>

          <button
            onClick={handleGoogleLogin}
            className="w-full border flex items-center justify-center gap-3 py-2 rounded-lg hover:bg-gray-50 transition"
          >
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="google"
              className="w-5 h-5"
            />
            Continue with Google
          </button>

          <p className="text-sm text-gray-500 mt-6 text-center">
            Don’t have an account?{" "}
            <Link to="/register" className="text-indigo-600 font-semibold">
              Register
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
}