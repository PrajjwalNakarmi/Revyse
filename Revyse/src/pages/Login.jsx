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

      // Role-based redirect
      if (data.user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }

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

      // Role-based redirect
      if (data.user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }

    }catch(err){
      setError("Google login failed");
    }
  };


  return (

    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#f5f4ef] px-4 py-6 sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute -left-16 top-14 h-64 w-64 rounded-full bg-[#f28f3b]/25 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-10 h-72 w-72 rounded-full bg-[#2f8f9d]/20 blur-3xl" />

      <div className="relative mx-auto grid w-full max-w-6xl overflow-hidden rounded-3xl border border-[#1f5d66]/20 bg-white/75 shadow-[0_30px_120px_-70px_rgba(15,42,52,0.7)] backdrop-blur-md lg:grid-cols-2">
        
        {/* LEFT SIDE */}
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

            <h1 className="mt-10 text-4xl font-semibold leading-tight">
              Welcome back to your momentum engine.
            </h1>
          </div>
        </section>

        {/* RIGHT SIDE */}
        <section className="p-8 sm:p-10 lg:p-12">

          <h2 className="text-3xl font-semibold text-slate-900">
            Sign in to Revyse
          </h2>

          {error && (
            <div className="mb-5 text-red-500 text-sm">{error}</div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              className="w-full p-3 border rounded"
            />

            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              className="w-full p-3 border rounded"
            />

            <button
              type="submit"
              className="w-full bg-[#0f2a34] text-white py-3 rounded"
            >
              Sign In
            </button>

          </form>

          <button
            onClick={handleGoogleLogin}
            className="mt-4 w-full border py-3 rounded"
          >
            Continue with Google
          </button>

          <p className="mt-4 text-center">
            <Link to="/register">Create account</Link>
          </p>

        </section>
      </div>
    </div>
  );
}