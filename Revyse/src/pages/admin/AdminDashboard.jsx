import { useEffect, useMemo, useState } from "react";
import {
  FaUsers,
  FaFileAlt,
  FaBriefcase,
  FaShieldAlt,
  FaArrowRight,
} from "react-icons/fa";
import { fetchAdminSummary } from "../../services/adminService";

export default function AdminDashboard() {
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    const loadSummary = async () => {
      try {
        const data = await fetchAdminSummary();
        setSummary(data);
      } catch {
        setSummary(null);
      }
    };

    loadSummary();
    const timer = setInterval(loadSummary, 8000);
    return () => clearInterval(timer);
  }, []);

  const metrics = useMemo(
    () => [
      { title: "Total users", value: summary?.totalUsers ?? "-", icon: FaUsers, accent: "bg-[#0f766e]" },
      { title: "CV uploads", value: summary?.cvUploads ?? "-", icon: FaFileAlt, accent: "bg-[#ff8a4c]" },
      { title: "Jobs synced", value: summary?.jobsSynced ?? "-", icon: FaBriefcase, accent: "bg-[#0f766e]" },
      { title: "Issues found", value: summary?.issuesFound ?? "-", icon: FaShieldAlt, accent: "bg-[#ef4444]" },
    ],
    [summary]
  );

  return (
    <div className="grid h-full content-start gap-4">
      <section className="grid gap-4 xl:grid-cols-[1.45fr_1fr]">
        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <p className="text-xs uppercase tracking-[0.24em] text-teal-700">Overview</p>
          <h2 className="mt-3 text-2xl font-semibold text-slate-900">Platform health at a glance</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">Track growth, performance, and current activity across the Revyse ecosystem.</p>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {metrics.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-sm text-slate-500">{item.title}</p>
                      <p className="mt-2 text-2xl font-semibold text-slate-900">{item.value}</p>
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

        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <p className="text-xs uppercase tracking-[0.24em] text-teal-700">Insight</p>
          <h2 className="mt-3 text-xl font-semibold text-slate-900">Weekly platform momentum</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">Engagement is up 14% week-over-week, with CV uploads and job matches leading the charge.</p>

          <div className="mt-5 space-y-3">
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <div className="flex items-center justify-between text-sm text-slate-600">
                <span>Resume conversion</span>
                <span>74%</span>
              </div>
              <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-200">
                <div className="h-full w-[74%] rounded-full bg-[#0f766e]" />
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
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

      <section className="grid gap-4 xl:grid-cols-[1.25fr_0.75fr]">
        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.24em] text-teal-700">Activity</p>
              <h3 className="mt-3 text-xl font-semibold text-slate-900">Recent platform actions</h3>
            </div>
            <button className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50">
              <FaArrowRight /> See all
            </button>
          </div>

          <div className="mt-5 space-y-3 text-sm text-slate-700">
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <p className="font-semibold text-slate-900">User uploaded a new CV</p>
              <p className="mt-1 text-slate-600">A candidate submitted resume.pdf through the OCR pipeline.</p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <p className="font-semibold text-slate-900">Job API refreshed</p>
              <p className="mt-1 text-slate-600">RemoteOK and LinkedIn sources synced with 340 open roles.</p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <p className="font-semibold text-slate-900">AI engine checked</p>
              <p className="mt-1 text-slate-600">Resume rewrite and scoring services are operational.</p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <p className="text-xs uppercase tracking-[0.24em] text-teal-700">Status</p>
          <h3 className="mt-3 text-xl font-semibold text-slate-900">Service health</h3>

          <div className="mt-5 space-y-3 text-sm text-slate-700">
            {[
              { label: "OCR Service", status: summary?.services?.ocrService || "Active" },
              { label: "Jobs API", status: summary?.services?.jobsApi || "Running" },
              { label: "AI Engine", status: summary?.services?.aiEngine || "Operational" },
              { label: "Database", status: summary?.services?.database || "Connected" },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 p-4">
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
