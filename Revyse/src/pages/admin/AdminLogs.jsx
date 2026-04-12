import { FaExclamationTriangle, FaCheckCircle, FaBell } from "react-icons/fa";

const logs = [
  { time: "10:45 AM", message: "Job API returned slow response", level: "Warning" },
  { time: "09:20 AM", message: "New user signup approved", level: "Info" },
  { time: "08:15 AM", message: "AI service heartbeat received", level: "Success" },
];

export default function AdminLogs() {
  return (
    <div className="space-y-8">
      <div className="glass-card rounded-[32px] border border-slate-200/70 bg-white/90 p-6 shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-[#0f766e]">System logs</p>
            <h1 className="mt-3 text-3xl font-semibold text-slate-950">Platform activity feed</h1>
            <p className="mt-2 max-w-xl text-sm leading-6 text-slate-600">Review the latest events, warnings, and health signals coming from the backend services.</p>
          </div>
          <button className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-50">
            <FaBell /> Refresh logs
          </button>
        </div>
      </div>

      <div className="glass-card rounded-[32px] border border-slate-200/70 bg-white/90 p-6 shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
        <div className="overflow-hidden rounded-[28px] border border-slate-200/80 bg-slate-50">
          <table className="w-full text-left text-sm text-slate-700">
            <thead className="bg-slate-100 text-slate-500">
              <tr>
                <th className="px-4 py-4">Time</th>
                <th className="px-4 py-4">Message</th>
                <th className="px-4 py-4">Level</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((entry) => (
                <tr key={entry.time} className="border-t border-slate-200">
                  <td className="px-4 py-4 font-medium text-slate-900">{entry.time}</td>
                  <td className="px-4 py-4 text-slate-600">{entry.message}</td>
                  <td className="px-4 py-4">
                    <span className={`inline-flex items-center gap-2 rounded-full px-3 py-2 text-xs font-semibold ${
                      entry.level === "Success"
                        ? "bg-emerald-100 text-emerald-700"
                        : entry.level === "Warning"
                        ? "bg-amber-100 text-amber-700"
                        : "bg-slate-100 text-slate-700"
                    }`}>
                      {entry.level === "Success" ? <FaCheckCircle /> : entry.level === "Warning" ? <FaExclamationTriangle /> : <FaBell />}
                      {entry.level}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
