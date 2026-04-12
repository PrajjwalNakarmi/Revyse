import { Outlet, useLocation } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";

export default function AdminLayout() {
  const location = useLocation();

  const headingMap = {
    "/admin": "Dashboard",
    "/admin/users": "Users",
    "/admin/cv": "CV Review",
    "/admin/jobs": "Job Integrations",
    "/admin/logs": "System Logs",
  };

  const currentHeading = headingMap[location.pathname] || "Admin";

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#f3f7fb] text-slate-900">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_12%_8%,rgba(15,118,110,0.16),transparent_26%),radial-gradient(circle_at_90%_0%,rgba(59,130,246,0.14),transparent_30%),linear-gradient(180deg,#f3f7fb_0%,#eaf1f7_60%,#e6eef6_100%)]" />

      <div className="mx-auto flex h-screen max-w-[1650px] gap-4 p-4 lg:p-6">
        <aside className="hidden w-72 shrink-0 lg:block">
          <div className="h-full rounded-3xl border border-slate-200/80 bg-white/95 p-4 shadow-[0_24px_60px_rgba(15,23,42,0.12)]">
            <AdminSidebar />
          </div>
        </aside>

        <main className="flex min-h-0 flex-1 flex-col gap-4">
          <div className="rounded-3xl border border-slate-200/80 bg-white/90 p-5 shadow-[0_20px_50px_rgba(15,23,42,0.1)]">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-teal-700">Revyse Admin</p>
                <h1 className="mt-2 text-2xl font-semibold text-slate-900 sm:text-3xl">{currentHeading}</h1>
                <p className="mt-2 text-sm text-slate-600">Strict monitoring workspace for users, resumes, integrations, and logs.</p>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-600">
                <span className="rounded-full border border-teal-400/40 bg-teal-500/10 px-3 py-1.5 font-semibold text-teal-700">Live</span>
                <span className="rounded-full border border-slate-300 bg-white px-3 py-1.5">Updated now</span>
              </div>
            </div>
          </div>

          <div className="lg:hidden">
            <div className="rounded-3xl border border-slate-200/80 bg-white/90 p-3 shadow-[0_20px_50px_rgba(15,23,42,0.1)]">
              <AdminSidebar mobile />
            </div>
          </div>

          <section className="min-h-0 flex-1 overflow-hidden rounded-3xl border border-slate-200/80 bg-white/85 p-4 shadow-[0_24px_60px_rgba(15,23,42,0.1)] sm:p-5">
            <div className="h-full overflow-y-auto pr-1">
              <Outlet />
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
