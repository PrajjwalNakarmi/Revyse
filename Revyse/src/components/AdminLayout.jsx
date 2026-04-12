import { Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";

export default function AdminLayout() {
  return (
    <div className="relative min-h-screen bg-[#f6f4ef] text-slate-900">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_10%_10%,rgba(15,118,110,0.18),transparent_22%),radial-gradient(circle_at_90%_0%,rgba(255,138,76,0.16),transparent_28%),linear-gradient(180deg,#f6f4ef_0%,#ede6dc_100%)]" />

      <div className="mx-auto flex min-h-screen max-w-[1600px] flex-col gap-6 px-6 py-6 lg:flex-row lg:px-8">

        <aside className="hidden shrink-0 lg:block lg:w-72">
          <div className="glass-card flex h-full min-h-[calc(100vh-72px)] flex-col justify-between gap-6 rounded-[32px] border border-slate-200/70 bg-white/80 p-6 shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
            <div className="space-y-4">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-[#0f766e]">Revyse Admin</p>
                <h2 className="mt-3 text-3xl font-semibold text-slate-950">Control center</h2>
                <p className="mt-2 text-sm leading-6 text-slate-600">Manage users, CV uploads, job sources, and platform health in one place.</p>
              </div>
              <AdminSidebar />
            </div>

            <div className="rounded-[28px] border border-slate-200/70 bg-slate-50 p-4 text-sm text-slate-700 shadow-[0_10px_30px_rgba(15,23,42,0.08)]">
              <p className="font-semibold text-slate-900">Quick insight</p>
              <p className="mt-2 text-slate-600">Use the left menu to switch between overview, users, CVs, jobs and logs.</p>
            </div>
          </div>
        </aside>

        <main className="flex-1">
          <div className="glass-card mb-6 flex flex-col gap-4 rounded-[32px] border border-slate-200/70 bg-white/90 p-6 shadow-[0_20px_60px_rgba(15,23,42,0.08)] sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-[#0f766e]">Administrator</p>
              <h1 className="mt-3 text-3xl font-semibold text-slate-950">Admin dashboard</h1>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">Monitor platform performance, manage users, and keep the Revyse experience running smoothly.</p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button className="rounded-full bg-[#0f766e] px-5 py-3 text-sm font-semibold text-white shadow-[0_10px_30px_rgba(15,118,110,0.22)] transition hover:bg-[#0d6b5a]">
                New report
              </button>
              <button className="rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-50">
                Export data
              </button>
            </div>
          </div>

          <div className="space-y-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
