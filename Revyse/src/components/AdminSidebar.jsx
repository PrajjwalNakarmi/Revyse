import { NavLink } from "react-router-dom";

export default function AdminSidebar() {
  const linkStyle = "px-4 py-2 rounded-lg hover:bg-purple-600/30 transition";

  return (
    <div className="w-64 bg-black/40 backdrop-blur-lg border-r border-white/10 p-5 flex flex-col">
      
      {/* Logo */}
      <h1 className="text-2xl font-bold text-purple-400 mb-8">
        Revyse Admin
      </h1>

      {/* Navigation */}
      <nav className="flex flex-col gap-3">

        <NavLink
          to="/admin"
          end
          className={({ isActive }) =>
            `${linkStyle} ${isActive ? "bg-purple-600/40" : ""}`
          }
        >
          📊 Dashboard
        </NavLink>

        <NavLink
          to="/admin/users"
          className={({ isActive }) =>
            `${linkStyle} ${isActive ? "bg-purple-600/40" : ""}`
          }
        >
          👥 Users
        </NavLink>

        <NavLink
          to="/admin/cv"
          className={({ isActive }) =>
            `${linkStyle} ${isActive ? "bg-purple-600/40" : ""}`
          }
        >
          📄 CV Management
        </NavLink>

        <NavLink
          to="/admin/jobs"
          className={({ isActive }) =>
            `${linkStyle} ${isActive ? "bg-purple-600/40" : ""}`
          }
        >
          💼 Job APIs
        </NavLink>

        <NavLink
          to="/admin/logs"
          className={({ isActive }) =>
            `${linkStyle} ${isActive ? "bg-purple-600/40" : ""}`
          }
        >
          ⚠️ System Logs
        </NavLink>

      </nav>

      {/* Bottom Section */}
      <div className="mt-auto pt-6 border-t border-white/10">
        <button className="w-full bg-purple-600 hover:bg-purple-700 py-2 rounded-lg">
          Logout
        </button>
      </div>

    </div>
  );
}