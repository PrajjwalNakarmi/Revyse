import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import AppFooter from "../components/AppFooter";
import { searchJobsBySkills } from "../services/jobService";

export default function JobMatching() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [noResume, setNoResume] = useState(false);

  useEffect(() => {
    const resume = JSON.parse(localStorage.getItem("selectedResume"));

    if (!resume || !resume.skills || resume.skills.length === 0) {
      setNoResume(true);
      setLoading(false);
      return;
    }

    async function loadJobs() {
      try {
        const results = await searchJobsBySkills(resume.skills);

        // ✅ FIX: handle BOTH array and object
        const jobList = Array.isArray(results)
          ? results
          : results?.jobs || [];

        if (!jobList.length) {
          console.warn("No jobs returned from API");
        }

        // 🔥 NO NEED TO RE-CALCULATE MATCH AGAIN (already done in service)
        setJobs(jobList);

      } catch (error) {
        console.error("Job loading failed", error);
      } finally {
        setLoading(false);
      }
    }

    loadJobs();
  }, []);

  const saveJob = (job) => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) return;

    const key = `savedJobs_${user.id}`;
    const existing = JSON.parse(localStorage.getItem(key)) || [];

    if (existing.find((j) => j.id === job.id)) {
      alert("Job already saved");
      return;
    }

    const updated = [...existing, job];
    localStorage.setItem(key, JSON.stringify(updated));

    alert("Job saved successfully");
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f5f4ef] text-slate-900">
      <Navbar />

      <main className="max-w-7xl mx-auto w-full flex-1 px-6 py-10">

        <section className="mb-8 overflow-hidden rounded-3xl border border-[#1f5d66]/15 bg-gradient-to-r from-[#0f2a34] via-[#15424b] to-[#1f5d66] px-6 py-8 text-white shadow-[0_24px_80px_-40px_rgba(15,42,52,0.65)] sm:px-8">
          <p className="mb-2 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-[#ffd4a8]">
            <span className="inline-flex h-2 w-2 rounded-full bg-[#f28f3b]" />
            Revyse Matching
          </p>
          <h1 className="text-3xl font-semibold leading-tight sm:text-4xl">
            Jobs matched to your resume
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-slate-200 sm:text-base">
            Explore role suggestions scored against your detected skills and apply with confidence.
          </p>
        </section>

        {loading && (
          <div className="glass-card rounded-2xl p-8 text-center text-slate-600">Loading jobs...</div>
        )}

        {noResume && (
          <div className="glass-card rounded-2xl p-10 text-center text-slate-600">
            No resume found. Upload or select a resume first.
          </div>
        )}

        {!loading && !noResume && jobs.length === 0 && (
          <div className="glass-card rounded-2xl p-10 text-center text-slate-600">
            No jobs available right now. Try again later.
          </div>
        )}

        {!noResume && jobs.length > 0 && (
          <div className="grid md:grid-cols-2 gap-6">

            {jobs.map((job) => (
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

                    <p className="text-xs text-slate-500">
                      {job.location}
                    </p>
                  </div>

                  <span
                    className={`px-3 py-1 text-xs rounded-full ${
                      job.matchScore >= 70
                        ? "bg-[#dff4ea] text-[#1e6d4a]"
                        : job.matchScore >= 40
                        ? "bg-[#fff1de] text-[#9a5e1f]"
                        : "bg-[#ffe8e8] text-[#8b2b2b]"
                    }`}
                  >
                    {job.matchScore}% Match
                  </span>
                </div>

                <p className="mb-4 line-clamp-4 text-sm text-slate-600">
                  {job.description}
                </p>

                <div className="flex justify-between">

                  <a
                    href={job.applyLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-[#1f5d66] hover:text-[#15424b]"
                  >
                    Apply →
                  </a>

                  <button
                    onClick={() => saveJob(job)}
                    className="text-sm font-medium text-[#1f5d66] hover:text-[#15424b]"
                  >
                    Save Job
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