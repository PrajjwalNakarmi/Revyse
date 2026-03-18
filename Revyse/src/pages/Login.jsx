import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser, registerUser } from "../services/authService";
import { auth, googleProvider } from "../services/firebase";
import { signInWithPopup } from "firebase/auth";

export default function Login() {

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
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

    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50 px-4">

      <div className="w-full max-w-5xl bg-white/80 backdrop-blur-lg border border-gray-100 rounded-2xl shadow-2xl grid md:grid-cols-2 overflow-hidden">

        {/* LEFT SIDE LOGIN FORM */}

        <div className="p-10 flex flex-col justify-center">

          <h1 className="text-2xl font-bold text-indigo-600 mb-1 tracking-tight">
            Revyse
          </h1>

          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Welcome Back
          </h2>

          <p className="text-gray-500 text-sm mb-6">
            Login to continue improving your resume
          </p>


          {error && (
            <div className="mb-4 px-4 py-2 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm">
              {error}
            </div>
          )}


          <form onSubmit={handleSubmit} className="space-y-5">

            <div>
              <label className="text-sm text-gray-600 font-medium">
                Email
              </label>

              <input
                type="email"
                placeholder="Enter your email"
                className="w-full mt-1 px-4 py-2.5 border border-gray-200 rounded-lg 
                focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 
                outline-none transition duration-200 bg-white"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                required
              />
            </div>


            <div>
              <label className="text-sm text-gray-600 font-medium">
                Password
              </label>

              <input
                type="password"
                placeholder="Enter your password"
                className="w-full mt-1 px-4 py-2.5 border border-gray-200 rounded-lg 
                focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 
                outline-none transition duration-200 bg-white"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                required
              />
            </div>


            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2.5 rounded-lg font-semibold 
              shadow-md hover:bg-indigo-700 hover:shadow-lg active:scale-[0.98] 
              transition duration-200"
            >
              Sign In
            </button>

          </form>


          <div className="flex items-center my-6">
            <div className="flex-1 border-t border-gray-200"></div>
            <span className="px-3 text-xs text-gray-400 font-medium">
              OR CONTINUE WITH
            </span>
            <div className="flex-1 border-t border-gray-200"></div>
          </div>


          <button
            onClick={handleGoogleLogin}
            className="w-full border border-gray-200 flex items-center justify-center gap-3 py-2.5 
            rounded-lg hover:bg-gray-50 hover:shadow-sm transition duration-200"
          >

            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="google"
              className="w-5 h-5"
            />

            <span className="text-sm font-medium text-gray-700">
              Continue with Google
            </span>

          </button>


          <p className="text-sm text-gray-500 mt-6 text-center">
            Don’t have an account?

            <Link
              to="/register"
              className="text-indigo-600 font-semibold ml-1 hover:underline"
            >
              Register
            </Link>
          </p>

        </div>


        {/* RIGHT SIDE */}

        <div className="hidden md:flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600 p-10">

          <div className="text-center text-white">

            <img
              src="https://cdn-icons-png.flaticon.com/512/4712/4712109.png"
              alt="ai"
              className="w-64 mx-auto mb-6 drop-shadow-xl"
            />

            <h3 className="text-2xl font-bold mb-3">
              Smart Resume AI
            </h3>

            <p className="text-indigo-100 text-sm max-w-sm mx-auto leading-relaxed">
              Analyze your CV, improve ATS score and discover
              job opportunities tailored to your skills.
            </p>

          </div>

        </div>

      </div>

    </div>

  );
}
