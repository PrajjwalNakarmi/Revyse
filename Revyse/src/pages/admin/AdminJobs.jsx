import { useEffect, useState } from "react";
import { FaSync, FaCloud, FaBolt } from "react-icons/fa";
import { fetchAdminJobsStatus } from "../../services/adminService";

export default function AdminJobs() {
  const [jobStatus, setJobStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loadJobsStatus = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await fetchAdminJobsStatus();
      setJobStatus(data);
    } catch (err) {
      setError(err.message || "Failed to load jobs status");
      setJobStatus(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadJobsStatus();
    const timer = setInterval(loadJobsStatus, 3000);
    return () => clearInterval(timer);
  }, []);

  const integrations = jobStatus?.services || [];

  return (
    <div className="grid h-full content-start gap-4">
      <div className="rounded-2xl border border-slate-200 bg-white p-5">
        <p className="text-xs uppercase tracking-[0.24em] text-teal-700">Job integrations</p>
        <h2 className="mt-2 text-2xl font-semibold text-slate-900">Jobs source management</h2>
        <p className="mt-2 text-sm leading-6 text-slate-600">Live sync state updates every 3 seconds.</p>
        {error && <p className="mt-2 text-sm text-red-600">{error}</p>}

        <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {!loading && integrations.length === 0 && (
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-500">No job sources available yet.</div>
          )}
          {integrations.map((integration) => (
            <div key={integration.name} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm text-slate-500">{integration.name}</p>
                  <p className="mt-2 text-xl font-semibold text-slate-900">{integration.status}</p>
                </div>
                <span className="rounded-full border border-slate-300 bg-white px-3 py-1 text-xs font-semibold text-slate-700">{integration.label}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-5 flex flex-wrap gap-3">
          <button
            onClick={loadJobsStatus}
            className="inline-flex items-center gap-2 rounded-full bg-[#0f766e] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#0d6b5a]"
          >
            <FaSync /> Refresh all feeds
          </button>
          <button className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50">
            <FaCloud /> API jobs: {jobStatus?.jobsCount ?? "-"}
          </button>
          <button className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50">
            <FaBolt /> DB jobs: {jobStatus?.dbJobs ?? "-"}
          </button>
        </div>
        <p className="mt-3 text-xs text-slate-500">Last sync: {jobStatus?.lastSyncedAt ? new Date(jobStatus.lastSyncedAt).toLocaleString() : "-"}</p>
      </div>
    </div>
  );
}