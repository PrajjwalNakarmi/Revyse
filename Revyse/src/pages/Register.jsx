import { useState } from "react";
import { registerUser } from "../services/authService";
import { useNavigate, Link } from "react-router-dom";
import "./register.css";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      await registerUser({ name, email, password });
      navigate("/login");
    } catch (err) {
      setError(err.message || "Registration failed");
    }
  };

  return (
    <div className="register-page">
      <div className="register-layout">
        {/* Branding */}
        <div className="register-branding">
          <div className="brand-header">
            <h1 className="brand-name">Revyse</h1>
          </div>

          <p className="brand-tagline">
            Create your account and start building smarter CVs with AI.
          </p>

          <ul className="feature-list">
            <li className="feature-item">
              <span className="checkmark">✓</span>
              Upload & Analyze CVs
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

        {/* Register Inputs (NO FORM) */}
        <div className="register-form-container">
          <h2 className="form-title">Create Account</h2>
          <p className="form-subtitle">
            Register to get started with Revyse
          </p>

          {error && <p style={{ color: "red" }}>{error}</p>}

          
          <div className="register-form">
            <label>
              Full Name
              <input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </label>

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
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </label>

            <button
              className="register-button"
              type="button"
              onClick={handleSubmit}
            >
              Register
            </button>
          </div>

          <div className="form-footer">
            Already have an account?{" "}
            <Link to="/login" className="login-link">
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
