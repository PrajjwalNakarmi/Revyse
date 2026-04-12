import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaChartBar, FaUsers, FaFileAlt, FaBriefcase, FaExclamationTriangle, FaSignOutAlt } from "react-icons/fa";
import { logoutUser } from "../services/authService";
import { fetchAdminSummary } from "../services/adminService";

const links = [
  { path: "/admin", label: "Dashboard", icon: FaChartBar },
  { path: "/admin/users", label: "Users", icon: FaUsers },
  { path: "/admin/cv", label: "CVs", icon: FaFileAlt },
  { path: "/admin/jobs", label: "Jobs", icon: FaBriefcase },
  { path: "/admin/logs", label: "Logs", icon: FaExclamationTriangle },
];

export default function AdminSidebar({ mobile = false }) {
  const navigate = useNavigate();
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    const loadSummary = async () => {
      try {
        const data = await fetchAdminSummary();
        setSummary(data);
      } catch {
        setSummary(null);
      }
    };

    loadSummary();
    const timer = setInterval(loadSummary, 8000);
    return () => clearInterval(timer);
  }, []);

  const handleLogout = () => {
    logoutUser();
    navigate("/login");
  };

  if (mobile) {
    return (
      <div className="space-y-3">
        <div className="flex items-center justify-between px-2">
          <p className="text-xs uppercase tracking-[0.24em] text-teal-700">Navigation</p>
          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-1.5 rounded-full border border-red-300 bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-700"
          >
            <FaSignOutAlt className="h-3 w-3" /> Logout
          </button>
        </div>

        <nav className="flex gap-2 overflow-x-auto pb-1">
          {links.map((link) => {
            const Icon = link.icon;
            return (
              <NavLink
                key={link.path}
                to={link.path}
                end={link.path === "/admin"}
                className={({ isActive }) =>
                  `inline-flex shrink-0 items-center gap-2 rounded-xl border px-3 py-2 text-sm font-semibold transition ${
                    isActive
                      ? "border-teal-400/50 bg-teal-500/10 text-teal-700"
                      : "border-slate-300 bg-white text-slate-700 hover:border-slate-400"
                  }`
                }
              >
                <Icon className="h-4 w-4" />
                {link.label}
              </NavLink>
            );
          })}
        </nav>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col">
      <div className="rounded-2xl border border-slate-200 bg-white p-4">
        <p className="text-xs uppercase tracking-[0.26em] text-teal-700">Admin console</p>
        <h2 className="mt-2 text-2xl font-semibold text-slate-900">Revyse Control</h2>
        <p className="mt-2 text-sm leading-6 text-slate-600">Focused access to dashboard, users, CVs, jobs, and logs.</p>
      </div>

      <nav className="mt-4 space-y-2">
        {links.map((link) => {
          const Icon = link.icon;
          return (
            <NavLink
              key={link.path}
              to={link.path}
              end={link.path === "/admin"}
              className={({ isActive }) =>
                `group flex items-center gap-3 rounded-2xl border px-3 py-2.5 text-sm font-semibold transition ${
                  isActive
                    ? "border-teal-400/45 bg-teal-500/10 text-teal-700"
                    : "border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50"
                }`
              }
            >
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-600 transition group-hover:border-teal-300/60 group-hover:text-teal-700">
                <Icon className="h-5 w-5" />
              </span>
              {link.label}
            </NavLink>
          );
        })}
      </nav>

      <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-4">
        <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Status</p>
        <div className="mt-4 space-y-3 text-sm text-slate-700">
          <div className="flex items-center justify-between">
            <span>Users</span>
            <strong className="text-slate-900">{summary?.totalUsers ?? "-"}</strong>
          </div>
          <div className="flex items-center justify-between">
            <span>CVs</span>
            <strong className="text-slate-900">{summary?.cvUploads ?? "-"}</strong>
          </div>
          <div className="flex items-center justify-between">
            <span>Jobs</span>
            <strong className="text-slate-900">{summary?.jobsSynced ?? "-"}</strong>
          </div>
        </div>
      </div>

      <button
        onClick={handleLogout}
        className="mt-auto inline-flex w-full items-center justify-center gap-2 rounded-xl border border-red-300 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700 transition hover:bg-red-100"
      >
        <FaSignOutAlt className="h-4 w-4" /> Logout
      </button>
    </div>
  );
}
