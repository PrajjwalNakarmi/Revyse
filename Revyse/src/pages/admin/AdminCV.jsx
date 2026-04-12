import { useEffect, useState } from "react";
import { FaFileAlt, FaCheckCircle, FaClock, FaTimesCircle, FaSync } from "react-icons/fa";
import { fetchAdminCVs } from "../../services/adminService";

export default function AdminCV() {
  const [cvEntries, setCvEntries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loadCVs = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await fetchAdminCVs();
      setCvEntries(data);
    } catch (err) {
      setError(err.message || "Failed to load CVs");
      setCvEntries([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCVs();
    const timer = setInterval(loadCVs, 3000);
    return () => clearInterval(timer);
  }, []);

  const statusMeta = {
    Processed: { Icon: FaCheckCircle, color: "text-emerald-600" },
    Review: { Icon: FaClock, color: "text-amber-500" },
    Failed: { Icon: FaTimesCircle, color: "text-red-500" },
  };

  return (
    <div className="grid h-full content-start gap-4">
      <div className="rounded-2xl border border-slate-200 bg-white p-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-teal-700">CV management</p>
            <h2 className="mt-2 text-2xl font-semibold text-slate-900">Review uploaded resumes</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">Live feed auto-refreshes every 3 seconds.</p>
          </div>
          <button
            onClick={loadCVs}
            className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            <FaSync /> Refresh
          </button>
        </div>
        {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
      </div>

      <div className="min-h-0 rounded-2xl border border-slate-200 bg-white p-5">
        <div className="max-h-[56vh] overflow-auto rounded-xl border border-slate-200 bg-white">
          <table className="w-full text-left text-sm text-slate-700">
            <thead className="sticky top-0 bg-slate-100 text-slate-500">
              <tr>
                <th className="px-4 py-4">User</th>
                <th className="px-4 py-4">File</th>
                <th className="px-4 py-4">Status</th>
                <th className="px-4 py-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {loading && (
                <tr className="border-t border-slate-200">
                  <td className="px-4 py-4 text-slate-500" colSpan={4}>Loading CV feed...</td>
                </tr>
              )}
              {!loading && cvEntries.length === 0 && (
                <tr className="border-t border-slate-200">
                  <td className="px-4 py-4 text-slate-500" colSpan={4}>No CV records found.</td>
                </tr>
              )}
              {cvEntries.map((entry) => {
                const meta = statusMeta[entry.status] || statusMeta.Review;
                const StatusIcon = meta.Icon;
                return (
                  <tr key={entry.id || `${entry.user}-${entry.file}`} className="border-t border-slate-200">
                    <td className="px-4 py-4 font-medium text-slate-900">{entry.user}</td>
                    <td className="flex items-center gap-2 px-4 py-4 text-slate-600">
                      <FaFileAlt /> {entry.file}
                    </td>
                    <td className="px-4 py-4">
                      <span className={`inline-flex items-center gap-2 rounded-full bg-white px-3 py-2 text-xs font-semibold ${meta.color}`}>
                        <StatusIcon /> {entry.status}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <span className="text-xs text-slate-500">{entry.createdAt ? new Date(entry.createdAt).toLocaleString() : "-"}</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
