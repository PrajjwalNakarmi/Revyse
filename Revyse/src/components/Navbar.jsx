import { useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  getCurrentUser,
  clearCurrentUser,
  getUserResumes,
} from "../services/userService";

export default function Navbar({ onUploadClick }) {
  const location = useLocation();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [resumeCount, setResumeCount] = useState(0);

  useEffect(() => {
    const currentUser = getCurrentUser();
    setUser(currentUser);

    if (currentUser) {
      const resumes = getUserResumes(currentUser.id);
      setResumeCount(resumes.length);
    }
  }, [location]);

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    }

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    clearCurrentUser();
    navigate("/login");
  };

  if (!user) return null;

  return (
    <header className="bg-white border-b">
      {/* Top bar */}
      <div className="flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-indigo-500 rounded flex items-center justify-center text-white font-bold">
            R
          </div>
          <div>
            <h1 className="text-lg font-bold text-gray-800">Revyse</h1>
            <p className="text-xs text-gray-500">AI Resume Platform</p>
          </div>
        </div>

        {/* Right section */}
        <div className="flex items-center gap-4">
          <div className="hidden sm:block text-right">
            <p className="text-sm font-semibold text-gray-800">
              {user.name || user.fullName}
            </p>
            <p className="text-xs text-gray-500">
              {resumeCount} resumes
            </p>
          </div>

          {onUploadClick && (
            <button
              onClick={onUploadClick}
              className="bg-indigo-500 text-white px-4 py-2 rounded-md text-sm font-semibold hover:bg-indigo-600 transition"
            >
              + Upload Resume
            </button>
          )}

          {/* User menu */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen((v) => !v)}
              className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center"
            >
              <span className="text-indigo-600 font-bold">
                {user.name?.[0] || user.fullName?.[0] || "U"}
              </span>
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-md overflow-hidden z-50">
                <button
                  onClick={() => navigate("/profile")}
                  className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
                >
                  Profile
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Secondary nav */}
      <nav className="flex gap-6 px-6 border-t text-sm">
        {[
          { to: "/dashboard", label: "Dashboard" },
          { to: "/analysis", label: "Analysis" },
          { to: "/job-matching", label: "Job Matching" },
          { to: "/saved-jobs", label: "Saved Jobs" },
          { to: "/resume-builder", label: "Resume Builder" },
        ].map((item) => (
          <Link
            key={item.to}
            to={item.to}
            className={`py-3 font-medium border-b-2 transition ${
              isActive(item.to)
                ? "border-indigo-500 text-indigo-600"
                : "border-transparent text-gray-500 hover:text-indigo-600"
            }`}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
