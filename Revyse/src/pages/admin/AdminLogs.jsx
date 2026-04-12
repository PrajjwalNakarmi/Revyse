import { useEffect, useState } from "react";
import { FaExclamationTriangle, FaCheckCircle, FaBell } from "react-icons/fa";
import { fetchAdminLogs } from "../../services/adminService";

export default function AdminLogs() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loadLogs = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await fetchAdminLogs();
      setLogs(data);
    } catch (err) {
      setError(err.message || "Failed to load logs");
      setLogs([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLogs();
    const timer = setInterval(loadLogs, 8000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="grid h-full content-start gap-4">
      <div className="rounded-2xl border border-slate-200 bg-white p-5">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-teal-700">System logs</p>
            <h2 className="mt-2 text-2xl font-semibold text-slate-900">Platform activity feed</h2>
            <p className="mt-2 max-w-xl text-sm leading-6 text-slate-600">Review the latest events, warnings, and health signals coming from the backend services.</p>
          </div>
          <button
            onClick={loadLogs}
            className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            <FaBell /> Refresh logs
          </button>
        </div>
      </div>

      <div className="min-h-0 rounded-2xl border border-slate-200 bg-white p-5">
        {error && <p className="mb-3 text-sm text-red-600">{error}</p>}
        <div className="max-h-[56vh] overflow-auto rounded-xl border border-slate-200 bg-white">
          <table className="w-full text-left text-sm text-slate-700">
            <thead className="sticky top-0 bg-slate-100 text-slate-500">
              <tr>
                <th className="px-4 py-4">Time</th>
                <th className="px-4 py-4">Message</th>
                <th className="px-4 py-4">Level</th>
              </tr>
            </thead>
            <tbody>
              {loading && (
                <tr className="border-t border-slate-200">
                  <td className="px-4 py-4 text-slate-500" colSpan={3}>Loading logs...</td>
                </tr>
              )}
              {!loading && logs.length === 0 && (
                <tr className="border-t border-slate-200">
                  <td className="px-4 py-4 text-slate-500" colSpan={3}>No logs available</td>
                </tr>
              )}
              {logs.map((entry) => (
                <tr key={entry.id || `${entry.time}-${entry.message}`} className="border-t border-slate-200">
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
