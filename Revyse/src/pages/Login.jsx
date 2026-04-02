import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser, registerUser } from "../services/authService";
import { auth, googleProvider } from "../services/firebase";
import { signInWithPopup } from "firebase/auth";

export default function Login() {

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [showPassword,setShowPassword] = useState(false);
  const [error,setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {

    e.preventDefault();

    try{

      const data = await loginUser({email,password});

      localStorage.setItem("token",data.token);
      localStorage.setItem("user",JSON.stringify(data.user));

      navigate("/dashboard");

    }catch(err){
      setError(err.message);
    }
  };


  const handleGoogleLogin = async () => {

    try{

      const result = await signInWithPopup(auth, googleProvider);

      const user = result.user;

      const googleUser = {
        name:user.displayName,
        email:user.email,
        password:user.uid
      };

      let data;

      try{

        data = await loginUser({
          email:googleUser.email,
          password:googleUser.password
        });

      }catch{

        await registerUser(googleUser);

        data = await loginUser({
          email:googleUser.email,
          password:googleUser.password
        });
      }

      localStorage.setItem("token",data.token);
      localStorage.setItem("user",JSON.stringify(data.user));

      navigate("/dashboard");

    }catch(err){
      setError("Google login failed");
    }
  };


  return (

    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#f5f4ef] px-4 py-6 sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute -left-16 top-14 h-64 w-64 rounded-full bg-[#f28f3b]/25 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-10 h-72 w-72 rounded-full bg-[#2f8f9d]/20 blur-3xl" />

      <div className="relative mx-auto grid w-full max-w-6xl overflow-hidden rounded-3xl border border-[#1f5d66]/20 bg-white/75 shadow-[0_30px_120px_-70px_rgba(15,42,52,0.7)] backdrop-blur-md lg:grid-cols-2">
        <section className="flex flex-col justify-between bg-[#0f2a34] px-8 py-10 text-white sm:px-10 lg:px-12">
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

            <h1 className="mt-10 text-4xl font-semibold leading-tight">Welcome back to your momentum engine.</h1>
            <p className="mt-4 max-w-md text-sm text-slate-200 sm:text-base">
              Continue where you left off, refine your resume with AI, and track the opportunities that fit your skills.
            </p>
          </div>

          <ul className="mt-12 space-y-4">
            <li className="flex items-start gap-3">
              <span className="mt-0.5 inline-flex h-7 w-7 items-center justify-center rounded-full bg-white/10 text-[#ffd4a8]">
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12l4 4 10-10" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <span className="text-sm text-slate-100">ATS scoring and actionable AI guidance</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-0.5 inline-flex h-7 w-7 items-center justify-center rounded-full bg-white/10 text-[#ffd4a8]">
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 8v8" strokeLinecap="round" />
                  <path d="M8 12h8" strokeLinecap="round" />
                  <circle cx="12" cy="12" r="9" />
                </svg>
              </span>
              <span className="text-sm text-slate-100">Smart role matches from your real resume data</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-0.5 inline-flex h-7 w-7 items-center justify-center rounded-full bg-white/10 text-[#ffd4a8]">
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 18h16" strokeLinecap="round" />
                  <path d="M7 14l3-3 3 2 4-5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <span className="text-sm text-slate-100">Progress tracking with every resume iteration</span>
            </li>
          </ul>
        </section>

        <section className="p-8 sm:p-10 lg:p-12">
          <div className="mb-7">
            <p className="inline-flex items-center gap-2 rounded-full bg-[#edf6f7] px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-[#1f5d66]">
              <span className="h-2 w-2 rounded-full bg-[#f28f3b]" />
              Secure Login
            </p>
            <h2 className="mt-4 text-3xl font-semibold text-slate-900">Sign in to Revyse</h2>
            <p className="mt-2 text-sm text-slate-500">Use your email account or continue with Google.</p>
          </div>

          {error && (
            <div className="mb-5 rounded-xl border border-[#d26b6b]/30 bg-[#fff3f3] px-4 py-3 text-sm text-[#8b2b2b]">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <label className="block text-sm font-medium text-slate-700">
              Email address
              <div className="mt-1.5 flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2.5 focus-within:border-[#1f5d66] focus-within:ring-2 focus-within:ring-[#1f5d66]/15">
                <svg viewBox="0 0 24 24" className="h-4 w-4 text-slate-400" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="5" width="18" height="14" rx="2" />
                  <path d="M3 7l9 6 9-6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="w-full border-0 bg-transparent p-0 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none"
                  value={email}
                  onChange={(e)=>setEmail(e.target.value)}
                  required
                />
              </div>
            </label>

            <label className="block text-sm font-medium text-slate-700">
              Password
              <div className="mt-1.5 flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2.5 focus-within:border-[#1f5d66] focus-within:ring-2 focus-within:ring-[#1f5d66]/15">
                <svg viewBox="0 0 24 24" className="h-4 w-4 text-slate-400" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="4" y="11" width="16" height="9" rx="2" />
                  <path d="M8 11V8a4 4 0 1 1 8 0v3" />
                </svg>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
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

            <button
              type="submit"
              className="mt-2 w-full rounded-xl bg-[#0f2a34] py-3 text-sm font-semibold text-white transition hover:bg-[#15424b]"
            >
              Sign In
            </button>
          </form>

          <div className="my-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-slate-200" />
            <span className="text-xs font-medium uppercase tracking-[0.14em] text-slate-400">or continue with</span>
            <div className="h-px flex-1 bg-slate-200" />
          </div>

          <button
            onClick={handleGoogleLogin}
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
            New here?
            <Link to="/register" className="ml-1 font-semibold text-[#1f5d66] hover:text-[#15424b]">
              Create an account
            </Link>
          </p>
        </section>
      </div>
    </div>

  );
}
