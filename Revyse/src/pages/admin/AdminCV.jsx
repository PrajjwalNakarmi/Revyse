import { FaFileAlt, FaCheckCircle, FaClock, FaTimesCircle } from "react-icons/fa";

const cvEntries = [
  { user: "John Doe", file: "resume.pdf", status: "Processed", icon: FaCheckCircle, color: "text-emerald-600" },
  { user: "Maya Lee", file: "cv-image.png", status: "Review", icon: FaClock, color: "text-amber-500" },
  { user: "Sarah Kim", file: "profile.docx", status: "Failed", icon: FaTimesCircle, color: "text-red-500" },
];

export default function AdminCV() {
  return (
    <div className="space-y-8">
      <div className="glass-card rounded-[32px] border border-slate-200/70 bg-white/90 p-6 shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
        <p className="text-sm uppercase tracking-[0.3em] text-[#0f766e]">CV management</p>
        <h1 className="mt-3 text-3xl font-semibold text-slate-950">Review uploaded resumes</h1>
        <p className="mt-2 text-sm leading-6 text-slate-600">Track status for every CV upload and resolve processing issues quickly.</p>
      </div>

      <div className="glass-card rounded-[32px] border border-slate-200/70 bg-white/90 p-6 shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
        <div className="overflow-hidden rounded-[28px] border border-slate-200/80 bg-slate-50">
          <table className="w-full text-left text-sm text-slate-700">
            <thead className="bg-slate-100 text-slate-500">
              <tr>
                <th className="px-4 py-4">User</th>
                <th className="px-4 py-4">File</th>
                <th className="px-4 py-4">Status</th>
                <th className="px-4 py-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {cvEntries.map((entry) => {
                const StatusIcon = entry.icon;
                return (
                  <tr key={entry.file} className="border-t border-slate-200">
                    <td className="px-4 py-4 font-medium text-slate-900">{entry.user}</td>
                    <td className="px-4 py-4 text-slate-600 flex items-center gap-2">
                      <FaFileAlt /> {entry.file}
                    </td>
                    <td className="px-4 py-4">
                      <span className={`inline-flex items-center gap-2 rounded-full bg-white px-3 py-2 text-xs font-semibold ${entry.color}`}>
                        <StatusIcon /> {entry.status}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <button className="rounded-full bg-[#0f766e] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#0d6b5a]">
                        Review
                      </button>
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
