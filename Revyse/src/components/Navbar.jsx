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
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [resumeCount, setResumeCount] = useState(0);

  const navItems = [
    {
      to: "/dashboard",
      label: "Dashboard",
      icon: (
        <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
          <rect x="3" y="3" width="8" height="8" rx="2" />
          <rect x="13" y="3" width="8" height="5" rx="2" />
          <rect x="13" y="10" width="8" height="11" rx="2" />
          <rect x="3" y="13" width="8" height="8" rx="2" />
        </svg>
      ),
    },
    {
      to: "/analysis",
      label: "Analysis",
      icon: (
        <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M4 19h16" />
          <path d="M7 16V9m5 7V6m5 10v-4" />
          <path d="m6 11 4-3 4 2 4-3" />
        </svg>
      ),
    },
    {
      to: "/job-matching",
      label: "Job Matching",
      icon: (
        <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
          <circle cx="10.5" cy="10.5" r="6.5" />
          <path d="m15.5 15.5 4.5 4.5" />
          <path d="m8.5 10.5 1.5 1.7 3-3.4" />
        </svg>
      ),
    },
    {
      to: "/saved-jobs",
      label: "Saved Jobs",
      icon: (
        <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M6 4h12a1 1 0 0 1 1 1v15l-7-4-7 4V5a1 1 0 0 1 1-1Z" />
        </svg>
      ),
    },
    {
      to: "/resume-builder",
      label: "Resume Builder",
      icon: (
        <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M4 5a2 2 0 0 1 2-2h9l5 5v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5Z" />
          <path d="M14 3v5h5" />
          <path d="m8 14 2-2 2 2 4-4" />
        </svg>
      ),
    },
  ];

  useEffect(() => {
    const currentUser = getCurrentUser();
    setUser(currentUser);
    setIsDropdownOpen(false);
    setIsNavOpen(false);

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
    <header className="sticky top-0 z-40 border-b border-[#1f2c33]/10 bg-[#f6f4ef]/90 backdrop-blur [font-family:'Space_Grotesk',sans-serif]">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4 py-3 md:px-8">
        <Link to="/dashboard" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#0f766e] via-[#15958b] to-[#ff8a4c] text-sm font-bold text-white shadow-[0_10px_24px_rgba(15,118,110,0.3)]">
            R
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight text-[#132126]">Revyse</h1>
            <p className="text-xs text-[#4c636d]">Career acceleration workspace</p>
          </div>
        </Link>

        <div className="flex items-center gap-2 md:gap-3">
          <div className="hidden text-right md:block">
            <p className="text-sm font-semibold text-[#1f2c33]">{user.name || user.fullName}</p>
            <p className="text-xs text-[#5a717a]">{resumeCount} resumes</p>
          </div>

          {onUploadClick && (
            <button
              onClick={onUploadClick}
              className="hidden items-center gap-2 rounded-full bg-gradient-to-r from-[#0f766e] to-[#15958b] px-4 py-2 text-sm font-semibold text-white shadow-[0_10px_20px_rgba(15,118,110,0.22)] transition hover:brightness-95 md:inline-flex"
              type="button"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M12 16V5" />
                <path d="m8.5 8.5 3.5-3.5 3.5 3.5" />
                <rect x="4" y="14" width="16" height="6" rx="2" />
              </svg>
              Upload Resume
            </button>
          )}

          <button
            onClick={() => setIsNavOpen((v) => !v)}
            className="inline-flex items-center gap-2 rounded-full border border-[#1f2c33]/15 bg-white/85 px-3 py-2 text-xs font-semibold text-[#24343c] transition hover:border-[#1f2c33]/30 md:hidden"
            type="button"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M4 7h16M4 12h16M4 17h16" />
            </svg>
            Menu
          </button>

          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen((v) => !v)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[#0f766e]/20 bg-[#0f766e]/10"
              type="button"
            >
              <span className="font-bold text-[#0f766e]">
                {user.name?.[0] || user.fullName?.[0] || "U"}
              </span>
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 z-50 mt-2 w-44 overflow-hidden rounded-xl border border-[#1f2c33]/12 bg-white shadow-lg">
                <button
                  onClick={() => navigate("/profile")}
                  className="flex w-full items-center gap-2 px-4 py-2.5 text-left text-sm text-[#24343c] transition hover:bg-[#0f766e]/10"
                  type="button"
                >
                  <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <circle cx="12" cy="8" r="3.2" />
                    <path d="M5 20a7 7 0 0 1 14 0" />
                  </svg>
                  Profile
                </button>
                <button
                  onClick={handleLogout}
                  className="flex w-full items-center gap-2 px-4 py-2.5 text-left text-sm text-[#b42318] transition hover:bg-[#b42318]/8"
                  type="button"
                >
                  <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M10 17 5 12l5-5" />
                    <path d="M5 12h10" />
                    <path d="M14 5h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3" />
                  </svg>
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <nav
        className={`border-t border-[#1f2c33]/10 bg-[#f6f4ef]/80 ${
          isNavOpen ? "block" : "hidden"
        } md:block`}
      >
        <div className="mx-auto flex w-full max-w-7xl flex-col px-4 py-2 text-sm md:px-8 md:py-3">
          <div className="flex flex-col gap-1 md:mx-auto md:w-fit md:flex-row md:items-center md:gap-2 md:rounded-2xl md:border md:border-[#1f2c33]/12 md:bg-white/65 md:px-3 md:py-1.5 md:shadow-[0_10px_30px_rgba(19,33,38,0.08)]">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={`flex items-center gap-2 rounded-lg px-3 py-2 font-medium transition md:rounded-xl md:px-3 md:py-2 ${
                isActive(item.to)
                  ? "bg-[#0f766e]/14 text-[#0f766e]"
                  : "text-[#4f656f] hover:bg-[#0f766e]/8 hover:text-[#0f766e]"
              }`}
            >
              {item.icon}
              {item.label}
            </Link>
          ))}
          </div>
        </div>
      </nav>
    </header>
  );
}
