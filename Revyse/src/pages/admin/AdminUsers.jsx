import { FaTrash, FaSearch, FaUserPlus } from "react-icons/fa";

const users = [
  { name: "John Doe", email: "john@test.com", role: "User" },
  { name: "Maya Lee", email: "maya@test.com", role: "User" },
  { name: "Sarah Kim", email: "sarah@test.com", role: "Admin" },
];

export default function AdminUsers() {
  return (
    <div className="space-y-8">
      <div className="glass-card rounded-[32px] border border-slate-200/70 bg-white/90 p-6 shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-[#0f766e]">User management</p>
            <h1 className="mt-3 text-3xl font-semibold text-slate-950">Manage users</h1>
            <p className="mt-2 text-sm leading-6 text-slate-600">Search, review, and action account roles from one place.</p>
          </div>
          <button className="inline-flex items-center gap-2 rounded-full bg-[#0f766e] px-5 py-3 text-sm font-semibold text-white shadow-[0_10px_30px_rgba(15,118,110,0.22)] transition hover:bg-[#0d6b5a]">
            <FaUserPlus /> Add user
          </button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_0.65fr]">
        <div className="glass-card rounded-[32px] border border-slate-200/70 bg-white/90 p-6 shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
          <div className="flex items-center gap-3 rounded-3xl border border-slate-200/80 bg-slate-50 px-4 py-3">
            <FaSearch className="text-slate-500" />
            <input
              type="text"
              placeholder="Search users..."
              className="w-full bg-transparent text-slate-900 outline-none placeholder:text-slate-400"
            />
          </div>

          <div className="mt-6 overflow-hidden rounded-[28px] border border-slate-200/80 bg-slate-50">
            <table className="w-full text-left text-sm text-slate-700">
              <thead className="bg-slate-100 text-slate-500">
                <tr>
                  <th className="px-4 py-4">Name</th>
                  <th className="px-4 py-4">Email</th>
                  <th className="px-4 py-4">Role</th>
                  <th className="px-4 py-4">Action</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.email} className="border-t border-slate-200">
                    <td className="px-4 py-4 font-medium text-slate-900">{user.name}</td>
                    <td className="px-4 py-4 text-slate-600">{user.email}</td>
                    <td className="px-4 py-4 text-slate-600">{user.role}</td>
                    <td className="px-4 py-4">
                      <button className="inline-flex items-center gap-2 rounded-full bg-red-100 px-3 py-2 text-sm font-semibold text-red-700 transition hover:bg-red-200">
                        <FaTrash /> Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="glass-card rounded-[32px] border border-slate-200/70 bg-white/90 p-6 shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
          <p className="text-sm uppercase tracking-[0.3em] text-[#0f766e]">Summary</p>
          <div className="mt-6 space-y-4 text-sm text-slate-700">
            <div className="rounded-3xl bg-slate-50 p-4">
              <p className="text-slate-900 font-semibold">Active accounts</p>
              <p className="mt-2 text-slate-600">120 total users currently active.</p>
            </div>
            <div className="rounded-3xl bg-slate-50 p-4">
              <p className="text-slate-900 font-semibold">Admin roles</p>
              <p className="mt-2 text-slate-600">3 users have administrator access.</p>
            </div>
            <div className="rounded-3xl bg-slate-50 p-4">
              <p className="text-slate-900 font-semibold">Pending approvals</p>
              <p className="mt-2 text-slate-600">6 new account requests need review.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
