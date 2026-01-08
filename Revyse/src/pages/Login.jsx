import { useState } from "react";
import { loginUser } from "../services/authService";
import { useNavigate, Link } from "react-router-dom";
import "./login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      console.log("LOGIN BUTTON CLICKED");

      const data = await loginUser({ email, password });

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      navigate("/dashboard");
    } catch (err) {
      setError(err.message || "Login failed");
    }
  };

  return (
    <div className="login-page">
      <div className="login-layout">
        {/* Branding */}
        <div className="login-branding">
          <div className="brand-header">
            <div className="logo-placeholder">📄</div>
            <h1 className="brand-name">Revyse</h1>
          </div>

          <p className="brand-tagline">
            AI-powered CV analysis and smart job matching to boost your career.
          </p>

          <ul className="feature-list">
            <li className="feature-item">
              <span className="checkmark">✓</span>
              CV Analysis & Insights
            </li>
            <li className="feature-item">
              <span className="checkmark">✓</span>
              Job Matching
            </li>
            <li className="feature-item">
              <span className="checkmark">✓</span>
              AI CV Generation
            </li>
          </ul>
        </div>

        {/* Login Inputs (NO FORM) */}
        <div className="login-form-container">
          <div className="form-header">
            <h2 className="form-title">Welcome Back</h2>
            <p className="form-subtitle">
              Login to access your dashboard
            </p>
          </div>

          {error && <p style={{ color: "red" }}>{error}</p>}

          
          <div className="login-form">
            <label>
              Email
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </label>

            <label>
              Password
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </label>

            <button
              className="login-button"
              type="button"
              onClick={handleSubmit}
            >
              Login
            </button>
          </div>

          <div className="form-footer">
            Don’t have an account?{" "}
            <Link to="/register" className="register-link">
              Register
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
