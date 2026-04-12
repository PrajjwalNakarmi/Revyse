import {
  FaUsers,
  FaFileAlt,
  FaBriefcase,
  FaShieldAlt,
  FaArrowUpRight,
} from "react-icons/fa";

const metrics = [
  { title: "Total users", value: "120", icon: FaUsers, accent: "bg-[#0f766e]" },
  { title: "CV uploads", value: "85", icon: FaFileAlt, accent: "bg-[#ff8a4c]" },
  { title: "Jobs synced", value: "340", icon: FaBriefcase, accent: "bg-[#0f766e]" },
  { title: "Issues found", value: "5", icon: FaShieldAlt, accent: "bg-[#ef4444]" },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      <section className="grid gap-6 md:grid-cols-[1.5fr_1fr]">
        <div className="glass-card rounded-[32px] border border-slate-200/70 bg-white/90 p-6 shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
          <p className="text-sm uppercase tracking-[0.3em] text-[#0f766e]">Overview</p>
          <h2 className="mt-4 text-3xl font-semibold text-slate-950">Platform health at a glance</h2>
          <p className="mt-3 text-sm leading-6 text-slate-600">Track growth, performance, and current activity across the Revyse ecosystem.</p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {metrics.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="rounded-[28px] border border-slate-200/70 bg-slate-50 p-5">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-sm text-slate-500">{item.title}</p>
                      <p className="mt-3 text-2xl font-semibold text-slate-950">{item.value}</p>
                    </div>
                    <div className={`${item.accent} inline-flex h-11 w-11 items-center justify-center rounded-2xl text-white`}>
                      <Icon className="h-5 w-5" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="glass-card rounded-[32px] border border-slate-200/70 bg-white/90 p-6 shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
          <p className="text-sm uppercase tracking-[0.3em] text-[#0f766e]">Insight</p>
          <h2 className="mt-4 text-2xl font-semibold text-slate-950">Weekly platform momentum</h2>
          <p className="mt-3 text-sm leading-6 text-slate-600">Engagement is up 14% week-over-week, with CV uploads and job matches leading the charge.</p>

          <div className="mt-8 space-y-4">
            <div className="rounded-3xl bg-slate-50 p-4">
              <div className="flex items-center justify-between text-sm text-slate-600">
                <span>Resume conversion</span>
                <span>74%</span>
              </div>
              <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-200">
                <div className="h-full w-[74%] rounded-full bg-[#0f766e]" />
              </div>
            </div>

            <div className="rounded-3xl bg-slate-50 p-4">
              <div className="flex items-center justify-between text-sm text-slate-600">
                <span>API success rate</span>
                <span>98%</span>
              </div>
              <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-200">
                <div className="h-full w-[98%] rounded-full bg-[#ff8a4c]" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.25fr_0.75fr]">
        <div className="glass-card rounded-[32px] border border-slate-200/70 bg-white/90 p-6 shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-[#0f766e]">Activity</p>
              <h3 className="mt-3 text-xl font-semibold text-slate-950">Recent platform actions</h3>
            </div>
            <button className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-slate-50">
              <FaArrowUpRight /> See all
            </button>
          </div>

          <div className="mt-6 space-y-4 text-sm text-slate-700">
            <div className="rounded-3xl bg-slate-50 p-4">
              <p className="font-semibold text-slate-900">User uploaded a new CV</p>
              <p className="mt-1 text-slate-600">A candidate submitted resume.pdf through the OCR pipeline.</p>
            </div>
            <div className="rounded-3xl bg-slate-50 p-4">
              <p className="font-semibold text-slate-900">Job API refreshed</p>
              <p className="mt-1 text-slate-600">RemoteOK and LinkedIn sources synced with 340 open roles.</p>
            </div>
            <div className="rounded-3xl bg-slate-50 p-4">
              <p className="font-semibold text-slate-900">AI engine checked</p>
              <p className="mt-1 text-slate-600">Resume rewrite and scoring services are operational.</p>
            </div>
          </div>
        </div>

        <div className="glass-card rounded-[32px] border border-slate-200/70 bg-white/90 p-6 shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
          <p className="text-sm uppercase tracking-[0.3em] text-[#0f766e]">Status</p>
          <h3 className="mt-3 text-xl font-semibold text-slate-950">Service health</h3>

          <div className="mt-6 space-y-4 text-sm text-slate-700">
            {[
              { label: "OCR Service", status: "Active" },
              { label: "Jobs API", status: "Running" },
              { label: "AI Engine", status: "Operational" },
              { label: "Database", status: "Connected" },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between rounded-3xl bg-slate-50 p-4">
                <span>{item.label}</span>
                <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">{item.status}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
