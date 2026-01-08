import { useState } from "react";
import { Link } from "react-router-dom";
import "../pages/auth.css";

export default function AuthForm({ mode = "Login", onSubmit }) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [rememberMe, setRememberMe] = useState(true);
  const [agreeToTerms, setAgreeToTerms] = useState(true);

  function handleSubmit() {
    if (mode === "Register") {
      if (password !== confirm) {
        alert("Passwords do not match");
        return;
      }
      if (!agreeToTerms) {
        alert("Please agree to the Terms of Service and Privacy Policy");
        return;
      }
      if (onSubmit) onSubmit({ fullName, email, password });
    } else {
      if (onSubmit) onSubmit({ email, password });
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-layout">
        {/* Left Column - Branding */}
        <div className="auth-branding">
          <div className="brand-header">
            <div className="logo-placeholder">📄</div>
            <h1 className="brand-name">Revyse</h1>
          </div>

          <p className="brand-tagline">
            AI-powered CV analysis and smart job matching to boost your career.
          </p>

          <ul className="feature-list">
            <li className="feature-item">
              <span className="checkmark">✓</span> Secure authentication
            </li>
            <li className="feature-item">
              <span className="checkmark">✓</span> Smart CV analysis
            </li>
            <li className="feature-item">
              <span className="checkmark">✓</span> Job matching
            </li>
          </ul>
        </div>

        {/* Right Column - Auth Inputs */}
        <div className="auth-form-container">
          <div className="form-header">
            <h2 className="form-title">
              {mode === "Login" ? "Welcome back" : "Create your account"}
            </h2>
            {mode === "Register" && (
              <p className="form-subtitle">
                Join Revyse and boost your career.
              </p>
            )}
          </div>

          
          <div className="auth-form">
            {mode === "Register" && (
              <label>
                Full Name
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Enter your full name"
                  required
                />
              </label>
            )}

            <label>
              Email
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />
            </label>

            <label>
              Password
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />
            </label>

            {mode === "Register" && (
              <label>
                Confirm Password
                <input
                  type="password"
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  placeholder="Confirm your password"
                  required
                />
              </label>
            )}

            {mode === "Login" && (
              <div className="form-options">
                <label className="remember-me">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  <span>Remember me</span>
                </label>
              </div>
            )}

            {mode === "Register" && (
              <label className="terms-checkbox">
                <input
                  type="checkbox"
                  checked={agreeToTerms}
                  onChange={(e) => setAgreeToTerms(e.target.checked)}
                />
                <span>I agree to the Terms & Privacy Policy</span>
              </label>
            )}

            <button
              type="button"
              className="auth-button"
              onClick={handleSubmit}
            >
              {mode === "Login" ? "Login" : "Create Account"}
            </button>

            {mode === "Login" ? (
              <p className="form-footer">
                Don’t have an account?{" "}
                <Link to="/register" className="register-link">
                  Register
                </Link>
              </p>
            ) : (
              <p className="form-footer">
                Already have an account?{" "}
                <Link to="/login" className="register-link">
                  Login
                </Link>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
