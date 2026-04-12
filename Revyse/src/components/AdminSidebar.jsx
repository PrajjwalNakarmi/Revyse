import { NavLink } from "react-router-dom";
import { FaChartBar, FaUsers, FaFileAlt, FaBriefcase, FaExclamationTriangle } from "react-icons/fa";

const links = [
  { path: "/admin", label: "Dashboard", icon: FaChartBar },
  { path: "/admin/users", label: "Users", icon: FaUsers },
  { path: "/admin/cv", label: "CVs", icon: FaFileAlt },
  { path: "/admin/jobs", label: "Jobs", icon: FaBriefcase },
  { path: "/admin/logs", label: "Logs", icon: FaExclamationTriangle },
];

export default function AdminSidebar() {
  return (
    <div className="space-y-8">
      <div className="rounded-[28px] border border-slate-200/70 bg-white/90 p-6 shadow-[0_18px_50px_rgba(15,23,42,0.08)]">
        <p className="text-sm uppercase tracking-[0.3em] text-[#0f766e]">Admin console</p>
        <h2 className="mt-3 text-2xl font-semibold text-slate-950">Revyse control</h2>
        <p className="mt-2 text-sm leading-6 text-slate-600">Quick access to the most important admin sections.</p>
      </div>

      <nav className="space-y-2">
        {links.map((link) => {
          const Icon = link.icon;
          return (
            <NavLink
              key={link.path}
              to={link.path}
              end={link.path === "/admin"}
              className={({ isActive }) =>
                `group flex items-center gap-3 rounded-3xl px-4 py-3 text-sm font-semibold transition ${
                  isActive
                    ? "bg-[#0f766e] text-white shadow-[0_12px_30px_rgba(15,118,110,0.18)]"
                    : "text-slate-700 hover:bg-slate-100 hover:text-slate-900"
                }`
              }
            >
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-100 text-slate-700 transition group-hover:bg-[#e2f5f0] group-hover:text-[#0f766e]">
                <Icon className="h-5 w-5" />
              </span>
              {link.label}
            </NavLink>
          );
        })}
      </nav>

      <div className="rounded-[28px] border border-slate-200/70 bg-slate-50 p-5 shadow-[0_18px_50px_rgba(15,23,42,0.08)]">
        <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Status</p>
        <div className="mt-4 space-y-3 text-sm text-slate-700">
          <div className="flex items-center justify-between">
            <span>Users</span>
            <strong>120</strong>
          </div>
          <div className="flex items-center justify-between">
            <span>CVs</span>
            <strong>85</strong>
          </div>
          <div className="flex items-center justify-between">
            <span>Jobs</span>
            <strong>340</strong>
          </div>
        </div>
      </div>

      <button className="w-full rounded-full bg-[#0f766e] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#0d6b5a]">
        Logout
      </button>
    </div>
  );
}
