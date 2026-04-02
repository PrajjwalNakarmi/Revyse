import { useState } from "react";
import Navbar from "../components/Navbar";
import AppFooter from "../components/AppFooter";

export default function Profile() {
  const storedUser = JSON.parse(localStorage.getItem("user"));

  const [user, setUser] = useState(storedUser);
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    name: storedUser?.name || storedUser?.fullName || "",
    email: storedUser?.email || "",
  });

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col bg-[#f5f4ef] text-slate-900">
        <Navbar />
        <main className="mx-auto flex w-full max-w-5xl flex-1 items-center justify-center px-6 py-16">
          <div className="glass-card w-full max-w-xl rounded-3xl border border-[#1f5d66]/10 p-8 text-center">
            <p className="text-lg font-semibold text-slate-900">No profile data found</p>
            <p className="mt-2 text-sm text-slate-600">Please log in again to load your Revyse profile.</p>
          </div>
        </main>
        <AppFooter className="mt-auto" />
      </div>
    );
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    if (!formData.name || !formData.email) {
      alert("All fields are required");
      return;
    }

    const updatedUser = {
      ...user,
      name: formData.name,
      email: formData.email,
    };

    localStorage.setItem("user", JSON.stringify(updatedUser));
    setUser(updatedUser);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      name: user.name || user.fullName,
      email: user.email,
    });
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f5f4ef] text-slate-900">
      <Navbar />

      <main className="relative mx-auto w-full max-w-6xl flex-1 px-6 py-10 sm:py-12">
        <div className="pointer-events-none absolute -left-10 top-16 h-44 w-44 rounded-full bg-[#f28f3b]/20 blur-3xl" />
        <div className="pointer-events-none absolute -right-10 top-40 h-52 w-52 rounded-full bg-[#2f8f9d]/15 blur-3xl" />

        <section className="relative overflow-hidden rounded-3xl border border-[#1f5d66]/15 bg-gradient-to-r from-[#0f2a34] via-[#15424b] to-[#1f5d66] px-6 py-8 text-white shadow-[0_24px_80px_-40px_rgba(15,42,52,0.65)] sm:px-8 sm:py-10">
          <div className="absolute -right-14 -top-14 h-40 w-40 rounded-full border border-white/10" />
          <div className="absolute right-16 top-10 h-2 w-2 rounded-full bg-[#ffd4a8]" />
          <div className="absolute right-24 top-20 h-1.5 w-1.5 rounded-full bg-white/60" />

          <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-[#ffd4a8]">
            <span className="inline-flex h-2 w-2 rounded-full bg-[#f28f3b]" />
            Revyse Profile Studio
          </p>
          <h1 className="text-3xl font-semibold leading-tight sm:text-4xl">Your personal career identity</h1>
          <p className="mt-2 max-w-2xl text-sm text-slate-200 sm:text-base">
            Keep your account details updated so every Revyse recommendation stays sharp and relevant.
          </p>
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-[1.2fr_1fr]">
          <article className="glass-card overflow-hidden rounded-3xl border border-[#1f5d66]/10">
            <div className="relative border-b border-[#1f5d66]/10 bg-gradient-to-r from-[#e8f4f6] via-[#f3fafb] to-[#fff7ee] px-6 py-6 sm:px-8">
              <div className="absolute right-6 top-4 rounded-full border border-[#1f5d66]/10 bg-white/70 px-3 py-1 text-xs font-medium uppercase tracking-[0.14em] text-[#1f5d66]">
                Active
              </div>

              <div className="flex items-start gap-4 sm:items-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#0f2a34] text-xl font-semibold text-white shadow-lg shadow-[#0f2a34]/20">
                  {user.name?.[0] || user.fullName?.[0] || "U"}
                </div>
                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.14em] text-[#1f5d66]">Profile Owner</p>
                  <h2 className="text-2xl font-semibold text-slate-900">{user.name || user.fullName}</h2>
                  <p className="text-sm text-slate-600">{user.email}</p>
                </div>
              </div>
            </div>

            <div className="px-6 py-6 sm:px-8 sm:py-8">
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="rounded-2xl border border-[#1f5d66]/10 bg-white/70 p-4">
                  <p className="mb-1 text-xs font-medium uppercase tracking-[0.12em] text-slate-500">Full Name</p>
                  {isEditing ? (
                    <input
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 outline-none transition focus:border-[#1f5d66] focus:ring-2 focus:ring-[#1f5d66]/15"
                    />
                  ) : (
                    <p className="font-semibold text-slate-800">{user.name || user.fullName}</p>
                  )}
                </div>

                <div className="rounded-2xl border border-[#1f5d66]/10 bg-white/70 p-4">
                  <p className="mb-1 text-xs font-medium uppercase tracking-[0.12em] text-slate-500">Email Address</p>
                  {isEditing ? (
                    <input
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 outline-none transition focus:border-[#1f5d66] focus:ring-2 focus:ring-[#1f5d66]/15"
                    />
                  ) : (
                    <p className="font-semibold text-slate-800">{user.email}</p>
                  )}
                </div>

                <div className="rounded-2xl border border-[#1f5d66]/10 bg-white/70 p-4">
                  <p className="mb-1 text-xs font-medium uppercase tracking-[0.12em] text-slate-500">Role</p>
                  <p className="font-semibold text-slate-800">{user.role || "User"}</p>
                </div>

                <div className="rounded-2xl border border-[#1f5d66]/10 bg-white/70 p-4">
                  <p className="mb-1 text-xs font-medium uppercase tracking-[0.12em] text-slate-500">Workspace State</p>
                  <span className="inline-flex rounded-full bg-[#dff4ea] px-3 py-1 text-sm font-medium text-[#1e6d4a]">Healthy</span>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                {!isEditing ? (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="inline-flex items-center gap-2 rounded-full bg-[#0f2a34] px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-[#15424b]"
                  >
                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M4 20h4l10-10-4-4L4 16v4z" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Edit Profile
                  </button>
                ) : (
                  <>
                    <button
                      onClick={handleSave}
                      className="inline-flex items-center gap-2 rounded-full bg-[#1f5d66] px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-[#15424b]"
                    >
                      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M5 12l4 4L19 6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      Save
                    </button>

                    <button
                      onClick={handleCancel}
                      className="inline-flex items-center gap-2 rounded-full border border-[#1f5d66]/20 bg-white px-6 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-[#f7fbfb]"
                    >
                      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
                      </svg>
                      Cancel
                    </button>
                  </>
                )}
              </div>
            </div>
          </article>

          <aside className="glass-card rounded-3xl border border-[#1f5d66]/10 p-6 sm:p-7">
            <h3 className="text-lg font-semibold text-slate-900">Revyse profile tips</h3>
            <p className="mt-2 text-sm text-slate-600">
              A polished profile keeps your dashboard insights, matching quality, and resume recommendations aligned with your goals.
            </p>

            <div className="mt-6 space-y-4">
              <div className="rounded-2xl border border-[#1f5d66]/10 bg-white/70 p-4">
                <p className="text-xs font-medium uppercase tracking-[0.14em] text-[#1f5d66]">Tip 01</p>
                <p className="mt-1 text-sm text-slate-700">Use your professional name exactly as shown on resumes and applications.</p>
              </div>
              <div className="rounded-2xl border border-[#1f5d66]/10 bg-white/70 p-4">
                <p className="text-xs font-medium uppercase tracking-[0.14em] text-[#1f5d66]">Tip 02</p>
                <p className="mt-1 text-sm text-slate-700">Keep your primary email up to date so account recovery stays simple.</p>
              </div>
              <div className="rounded-2xl border border-[#1f5d66]/10 bg-white/70 p-4">
                <p className="text-xs font-medium uppercase tracking-[0.14em] text-[#1f5d66]">Tip 03</p>
                <p className="mt-1 text-sm text-slate-700">Update this profile before generating a new AI resume version.</p>
              </div>
            </div>
          </aside>
        </section>
      </main>

      <AppFooter className="mt-auto" />
    </div>
  );
}