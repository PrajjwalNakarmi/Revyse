import { FaSync, FaCloud, FaBolt } from "react-icons/fa";

const integrations = [
  { name: "RemoteOK API", status: "Active", label: "Live" },
  { name: "LinkedIn API", status: "Active", label: "Live" },
  { name: "Internal jobs feed", status: "Syncing", label: "Pending" },
];

export default function AdminJobs() {
  return (
    <div className="space-y-8">
      <div className="glass-card rounded-[32px] border border-slate-200/70 bg-white/90 p-6 shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
        <p className="text-sm uppercase tracking-[0.3em] text-[#0f766e]">Job integrations</p>
        <h1 className="mt-3 text-3xl font-semibold text-slate-950">Jobs source management</h1>
        <p className="mt-2 text-sm leading-6 text-slate-600">Monitor job APIs, refresh feeds, and keep listings current across the platform.</p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {integrations.map((integration) => (
            <div key={integration.name} className="rounded-[28px] border border-slate-200/80 bg-slate-50 p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm text-slate-500">{integration.name}</p>
                  <p className="mt-3 text-xl font-semibold text-slate-950">{integration.status}</p>
                </div>
                <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-700 shadow-sm">{integration.label}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap gap-4">
          <button className="inline-flex items-center gap-2 rounded-full bg-[#0f766e] px-5 py-3 text-sm font-semibold text-white shadow-[0_10px_30px_rgba(15,118,110,0.22)] transition hover:bg-[#0d6b5a]">
            <FaSync /> Refresh all feeds
          </button>
          <button className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-50">
            <FaCloud /> Review API keys
          </button>
          <button className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-50">
            <FaBolt /> Re-run sync
          </button>
        </div>
      </div>
    </div>
  );
}