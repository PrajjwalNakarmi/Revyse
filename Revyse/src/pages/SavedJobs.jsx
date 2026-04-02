import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import AppFooter from "../components/AppFooter";

export default function SavedJobs() {
  const [user, setUser] = useState(null);
  const [savedJobs, setSavedJobs] = useState([]);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);

      const jobs =
        JSON.parse(localStorage.getItem(`savedJobs_${parsedUser.id}`)) || [];

      setSavedJobs(jobs);
    }
  }, []);

  const removeJob = (jobId) => {
    const updated = savedJobs.filter((job) => job.id !== jobId);

    setSavedJobs(updated);

    localStorage.setItem(
      `savedJobs_${user.id}`,
      JSON.stringify(updated)
    );
  };

  if (!user) {
    return <div className="p-10 text-center text-slate-600">Loading...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#f5f4ef] text-slate-900">
      <Navbar />

      <main className="max-w-7xl mx-auto w-full flex-1 px-6 py-10">
        <section className="mb-8 overflow-hidden rounded-3xl border border-[#1f5d66]/15 bg-gradient-to-r from-[#0f2a34] via-[#15424b] to-[#1f5d66] px-6 py-8 text-white shadow-[0_24px_80px_-40px_rgba(15,42,52,0.65)] sm:px-8">
          <p className="mb-2 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-[#ffd4a8]">
            <span className="inline-flex h-2 w-2 rounded-full bg-[#f28f3b]" />
            Revyse Library
          </p>
          <h1 className="text-3xl font-semibold leading-tight sm:text-4xl">Your saved opportunities</h1>
          <p className="mt-2 max-w-2xl text-sm text-slate-200 sm:text-base">
            Keep track of shortlisted roles and revisit them anytime.
          </p>
        </section>

        {savedJobs.length === 0 ? (
          <div className="glass-card rounded-2xl p-10 text-center text-slate-600">
            No saved jobs yet
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {savedJobs.map((job) => (
              <div
                key={job.id}
                className="glass-card rounded-2xl p-6 transition hover:-translate-y-0.5 hover:shadow-[0_24px_70px_-50px_rgba(15,42,52,0.9)]"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900">
                      {job.title}
                    </h3>

                    <p className="text-sm text-slate-600">
                      {job.company}
                    </p>
                  </div>

                  <span
                    className={`px-3 py-1 text-xs rounded-full ${
                      job.matchScore > 80
                        ? "bg-[#dff4ea] text-[#1e6d4a]"
                        : job.matchScore > 60
                        ? "bg-[#fff1de] text-[#9a5e1f]"
                        : "bg-[#ffe8e8] text-[#8b2b2b]"
                    }`}
                  >
                    {job.matchScore}% Match
                  </span>
                </div>

                <p className="mb-4 text-sm text-slate-600">
                  {job.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {job.skills?.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full bg-[#e1f0f2] px-2 py-1 text-xs text-[#11414a]"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                <div className="flex justify-between items-center">
                  <a
                    href={job.applyLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-[#1f5d66] hover:text-[#15424b]"
                  >
                    Apply →
                  </a>

                  <button
                    onClick={() => removeJob(job.id)}
                    className="text-sm text-[#8b2b2b] hover:underline"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <AppFooter className="mt-auto" />
    </div>
  );
}