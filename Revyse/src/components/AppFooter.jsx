import { Link } from "react-router-dom";

export default function AppFooter({ className = "" }) {
  return (
    <footer className={`border-t border-[#1f2c33]/10 bg-[#f0ece3] [font-family:'Space_Grotesk',sans-serif] ${className}`}>
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-3 px-6 py-8 text-sm text-[#496069] md:flex-row md:items-center md:justify-between md:px-10">
        <p>© 2026 Revyse. Build stronger applications with measurable progress.</p>
        <div className="flex flex-wrap items-center gap-5">
          <Link to="/dashboard" className="transition hover:text-[#0f766e]">
            Dashboard
          </Link>
          <Link to="/job-matching" className="transition hover:text-[#0f766e]">
            Job Matching
          </Link>
          <Link to="/profile" className="transition hover:text-[#0f766e]">
            Profile
          </Link>
        </div>
      </div>
    </footer>
  );
}
