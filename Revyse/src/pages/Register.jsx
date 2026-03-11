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

    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">

      <div className="w-full max-w-5xl bg-white shadow-xl rounded-2xl grid md:grid-cols-2 overflow-hidden">


        {/* LEFT INFO PANEL */}

        <div className="hidden md:flex flex-col justify-center bg-gradient-to-br from-indigo-500 to-purple-600 text-white p-12">

          <h1 className="text-3xl font-bold mb-6">
            Join Revyse
          </h1>

          <p className="text-indigo-100 text-sm leading-relaxed mb-10">
            Build smarter resumes, improve ATS scores and
            discover jobs tailored to your skills with AI.
          </p>

          <div className="space-y-6">

            <div className="flex gap-4 items-start">
              <div className="w-8 h-8 bg-white text-indigo-600 flex items-center justify-center rounded-full font-bold text-sm">
                1
              </div>
              <p className="text-sm text-indigo-100">
                Upload your resume and get instant analysis
              </p>
            </div>

            <div className="flex gap-4 items-start">
              <div className="w-8 h-8 bg-white text-indigo-600 flex items-center justify-center rounded-full font-bold text-sm">
                2
              </div>
              <p className="text-sm text-indigo-100">
                Improve your resume with AI suggestions
              </p>
            </div>

            <div className="flex gap-4 items-start">
              <div className="w-8 h-8 bg-white text-indigo-600 flex items-center justify-center rounded-full font-bold text-sm">
                3
              </div>
              <p className="text-sm text-indigo-100">
                Discover job opportunities that match your skills
              </p>
            </div>

          </div>

        </div>


        {/* RIGHT FORM */}

        <div className="p-10 flex flex-col justify-center">

          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Create Account
          </h2>

          <p className="text-gray-500 text-sm mb-6">
            Start your AI powered resume journey
          </p>


          {error && (
            <p className="text-red-500 text-sm mb-4">
              {error}
            </p>
          )}


          <form onSubmit={handleSubmit} className="space-y-4">

            <input
              type="text"
              placeholder="Full Name"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              value={name}
              onChange={(e)=>setName(e.target.value)}
              required
            />

            <input
              type="tel"
              placeholder="Phone Number"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              value={phone}
              onChange={(e)=>setPhone(e.target.value)}
              required
            />

            <input
              type="email"
              placeholder="Email Address"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              required
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              required
            />

            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              value={confirmPassword}
              onChange={(e)=>setConfirmPassword(e.target.value)}
              required
            />


            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 transition"
            >
              Create Account
            </button>

          </form>


          <div className="flex items-center my-6">

            <div className="flex-1 h-px bg-gray-300"></div>

            <span className="px-3 text-sm text-gray-400">
              OR
            </span>

            <div className="flex-1 h-px bg-gray-300"></div>

          </div>


          <button
            onClick={handleGoogleRegister}
            className="w-full border py-2 rounded-lg flex items-center justify-center gap-3 hover:bg-gray-50 transition"
          >

            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="google"
              className="w-5 h-5"
            />

            Continue with Google

          </button>


          <p className="text-sm text-gray-500 mt-6 text-center">

            Already have an account?

            <Link
              to="/login"
              className="text-indigo-600 font-semibold ml-1"
            >
              Login
            </Link>

          </p>

        </div>

      </div>

    </div>
  );
}