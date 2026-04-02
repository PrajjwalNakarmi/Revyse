import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../services/authService";

import { auth, googleProvider } from "../services/firebase";
import { signInWithPopup } from "firebase/auth";

export default function Register() {

  const navigate = useNavigate();

  const [name,setName] = useState("");
  const [phone,setPhone] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [confirmPassword,setConfirmPassword] = useState("");
  const [showPassword,setShowPassword] = useState(false);
  const [showConfirmPassword,setShowConfirmPassword] = useState(false);
  const [error,setError] = useState("");

  const handleSubmit = async (e) => {

    e.preventDefault();

    if(password !== confirmPassword){
      setError("Passwords do not match");
      return;
    }

    try{

      await registerUser({
        name,
        email,
        password,
        phone
      });

      navigate("/login");

    }catch(err){
      setError(err.message);
    }
  };


  const handleGoogleRegister = async () => {

    try{

      const result = await signInWithPopup(auth, googleProvider);

      const user = result.user;

      const users = JSON.parse(localStorage.getItem("users")) || [];

      const existingUser = users.find(
        (u) => u.email === user.email
      );

      if(existingUser){
        setError("User already exists. Please login.");
        return;
      }

      const newUser = {
        id:user.uid,
        name:user.displayName,
        email:user.email,
        phone:""
      };

      users.push(newUser);

      localStorage.setItem("users", JSON.stringify(users));
      localStorage.setItem("user", JSON.stringify(newUser));

      navigate("/dashboard");

    }catch(err){
      setError("Google sign in failed");
    }
  };


  return (

    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#f5f4ef] px-4 py-6 sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute right-0 top-16 h-72 w-72 rounded-full bg-[#f28f3b]/20 blur-3xl" />
      <div className="pointer-events-none absolute -left-20 bottom-8 h-72 w-72 rounded-full bg-[#2f8f9d]/20 blur-3xl" />

      <div className="relative mx-auto grid w-full max-w-6xl overflow-hidden rounded-3xl border border-[#1f5d66]/20 bg-white/75 shadow-[0_30px_120px_-70px_rgba(15,42,52,0.7)] backdrop-blur-md lg:grid-cols-2">
        <section className="hidden flex-col justify-between bg-[#0f2a34] px-10 py-11 text-white lg:flex">
          <div>
            <Link to="/" className="inline-flex items-center gap-3 text-lg font-semibold tracking-wide">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-[#f28f3b] text-[#132833]">
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 16V4h12" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M6 9h8" strokeLinecap="round" />
                  <path d="M6 14h12" strokeLinecap="round" />
                  <path d="M6 20h7" strokeLinecap="round" />
                </svg>
              </span>
              Revyse
            </Link>

            <h1 className="mt-10 text-4xl font-semibold leading-tight">Create your edge. Own your next career move.</h1>
            <p className="mt-4 max-w-md text-sm text-slate-200">
              Start with one profile and Revyse will help you optimize resumes, improve ATS fit, and discover better opportunities.
            </p>
          </div>

          <ul className="space-y-4">
            <li className="rounded-xl border border-white/15 bg-white/5 p-4">
              <p className="text-xs uppercase tracking-[0.16em] text-[#ffd4a8]">Step 1</p>
              <p className="mt-1 text-sm text-slate-100">Upload your resume and extract structured insights.</p>
            </li>
            <li className="rounded-xl border border-white/15 bg-white/5 p-4">
              <p className="text-xs uppercase tracking-[0.16em] text-[#ffd4a8]">Step 2</p>
              <p className="mt-1 text-sm text-slate-100">Get AI suggestions tailored to your target roles.</p>
            </li>
            <li className="rounded-xl border border-white/15 bg-white/5 p-4">
              <p className="text-xs uppercase tracking-[0.16em] text-[#ffd4a8]">Step 3</p>
              <p className="mt-1 text-sm text-slate-100">Apply with confidence using stronger resume versions.</p>
            </li>
          </ul>
        </section>

        <section className="p-8 sm:p-10 lg:p-12">
          <div className="mb-7">
            <p className="inline-flex items-center gap-2 rounded-full bg-[#edf6f7] px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-[#1f5d66]">
              <span className="h-2 w-2 rounded-full bg-[#f28f3b]" />
              New Account
            </p>
            <h2 className="mt-4 text-3xl font-semibold text-slate-900">Join Revyse</h2>
            <p className="mt-2 text-sm text-slate-500">Create your account to start building better resume outcomes.</p>
          </div>

          {error && (
            <div className="mb-5 rounded-xl border border-[#d26b6b]/30 bg-[#fff3f3] px-4 py-3 text-sm text-[#8b2b2b]">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-3.5">
            <div className="grid gap-3 sm:grid-cols-2">
              <label className="block text-sm font-medium text-slate-700">
                Full name
                <input
                  type="text"
                  placeholder="Alex Morgan"
                  className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 focus:border-[#1f5d66] focus:outline-none focus:ring-2 focus:ring-[#1f5d66]/15"
                  value={name}
                  onChange={(e)=>setName(e.target.value)}
                  required
                />
              </label>

              <label className="block text-sm font-medium text-slate-700">
                Phone
                <input
                  type="tel"
                  placeholder="+91 98765 43210"
                  className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 focus:border-[#1f5d66] focus:outline-none focus:ring-2 focus:ring-[#1f5d66]/15"
                  value={phone}
                  onChange={(e)=>setPhone(e.target.value)}
                  required
                />
              </label>
            </div>

            <label className="block text-sm font-medium text-slate-700">
              Email address
              <input
                type="email"
                placeholder="you@example.com"
                className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 focus:border-[#1f5d66] focus:outline-none focus:ring-2 focus:ring-[#1f5d66]/15"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                required
              />
            </label>

            <div className="grid gap-3 sm:grid-cols-2">
              <label className="block text-sm font-medium text-slate-700">
                Password
                <div className="mt-1.5 flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2.5 focus-within:border-[#1f5d66] focus-within:ring-2 focus-within:ring-[#1f5d66]/15">
                  <svg viewBox="0 0 24 24" className="h-4 w-4 text-slate-400" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="4" y="11" width="16" height="9" rx="2" />
                    <path d="M8 11V8a4 4 0 1 1 8 0v3" />
                  </svg>
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Create password"
                    className="w-full border-0 bg-transparent p-0 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none"
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? (
                      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M3 3l18 18" strokeLinecap="round" />
                        <path d="M10.6 10.6A3 3 0 0 0 12 15a3 3 0 0 0 2.4-4.4" strokeLinecap="round" />
                        <path d="M9.9 5.2A10.2 10.2 0 0 1 12 5c4.5 0 8.2 2.7 10 7-0.5 1.3-1.2 2.4-2 3.4" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M6.2 6.2C4.8 7.4 3.7 9 3 12c1.8 4.3 5.5 7 10 7 1.4 0 2.8-.3 4-1" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    ) : (
                      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z" strokeLinecap="round" strokeLinejoin="round" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    )}
                  </button>
                </div>
              </label>

              <label className="block text-sm font-medium text-slate-700">
                Confirm password
                <div className="mt-1.5 flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2.5 focus-within:border-[#1f5d66] focus-within:ring-2 focus-within:ring-[#1f5d66]/15">
                  <svg viewBox="0 0 24 24" className="h-4 w-4 text-slate-400" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="4" y="11" width="16" height="9" rx="2" />
                    <path d="M8 11V8a4 4 0 1 1 8 0v3" />
                  </svg>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Repeat password"
                    className="w-full border-0 bg-transparent p-0 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none"
                    value={confirmPassword}
                    onChange={(e)=>setConfirmPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                    className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
                    aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
                  >
                    {showConfirmPassword ? (
                      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M3 3l18 18" strokeLinecap="round" />
                        <path d="M10.6 10.6A3 3 0 0 0 12 15a3 3 0 0 0 2.4-4.4" strokeLinecap="round" />
                        <path d="M9.9 5.2A10.2 10.2 0 0 1 12 5c4.5 0 8.2 2.7 10 7-0.5 1.3-1.2 2.4-2 3.4" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M6.2 6.2C4.8 7.4 3.7 9 3 12c1.8 4.3 5.5 7 10 7 1.4 0 2.8-.3 4-1" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    ) : (
                      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z" strokeLinecap="round" strokeLinejoin="round" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    )}
                  </button>
                </div>
              </label>
            </div>

            <button
              type="submit"
              className="mt-2 w-full rounded-xl bg-[#0f2a34] py-3 text-sm font-semibold text-white transition hover:bg-[#15424b]"
            >
              Create Account
            </button>
          </form>

          <div className="my-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-slate-200" />
            <span className="text-xs font-medium uppercase tracking-[0.14em] text-slate-400">or continue with</span>
            <div className="h-px flex-1 bg-slate-200" />
          </div>

          <button
            onClick={handleGoogleRegister}
            className="flex w-full items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white py-3 text-sm font-semibold text-slate-700 transition hover:border-[#1f5d66]/40 hover:bg-[#f7fbfb]"
          >
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="google"
              className="h-5 w-5"
            />
            Continue with Google
          </button>

          <p className="mt-6 text-center text-sm text-slate-500">
            Already have an account?
            <Link to="/login" className="ml-1 font-semibold text-[#1f5d66] hover:text-[#15424b]">
              Sign in
            </Link>
          </p>
        </section>
      </div>
    </div>
  );
}