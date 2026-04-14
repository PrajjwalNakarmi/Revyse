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

        const jobList = Array.isArray(results)
          ? results
          : results?.jobs || [];

        setJobs(jobList);
      } catch (error) {
        console.error("Job loading failed", error);
      } finally {
        setLoading(false);
      }
    }

    loadJobs();
  }, []);

  // SAVE JOB
  const saveJob = async (job) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Please login first");
        return;
      }

      const res = await fetch("http://localhost:5000/api/saved-jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          job_id: job._id || job.id,
          title: job.job_title || job.title,
          company: job.company_name || job.company,
          description: job.job_description || job.description,
          apply_link: job.apply_link || job.url,
          match_score: job.match_score || job.matchScore || 0,
          skills: job.skills || [],
        }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Job saved successfully");
      } else {
        alert(data.message || "Error saving job");
      }
    } catch (error) {
      console.error(error);
      alert("Failed to save job");
    }
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
          <div className="glass-card rounded-2xl p-8 text-center text-slate-600">
            Loading jobs...
          </div>
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

            {jobs.map((job, index) => {
              const score = job.match_score || job.matchScore || 0;

              // CLEAN DESCRIPTION (remove HTML)
              const cleanDescription = (job.job_description || job.description || "")
                .replace(/<[^>]+>/g, "");

              // IMPROVED LINK GENERATION
              const generateJobLink = (job) => {
                if (job.apply_link && job.apply_link.startsWith("http")) {
                  return job.apply_link;
                }

                if (job.url && job.url.startsWith("http")) {
                  return job.url;
                }

                // fallback to company/job search
                const query =
                  (job.job_title || job.title || "") +
                  " " +
                  (job.company_name || job.company || "");

                return `https://www.google.com/search?q=${encodeURIComponent(query + " careers")}`;
              };

              const jobLink = generateJobLink(job);

              return (
                <div
                  key={job._id || index}
                  className="glass-card rounded-2xl p-6 transition hover:-translate-y-0.5 hover:shadow-[0_24px_70px_-50px_rgba(15,42,52,0.9)]"
                >

                  <div className="flex justify-between items-start mb-4">

                    <div>
                      <h3 className="text-lg font-semibold text-slate-900">
                        {job.job_title || job.title || "No Title"}
                      </h3>

                      <p className="text-sm text-slate-600">
                        {job.company_name || job.company || "Unknown Company"}
                      </p>

                      <p className="text-xs text-slate-500">
                        {job.location || "Remote"}
                      </p>
                    </div>

                    <span
                      className={`px-3 py-1 text-xs rounded-full ${
                        score > 80
                          ? "bg-[#dff4ea] text-[#1e6d4a]"
                          : score > 50
                          ? "bg-[#fff1de] text-[#9a5e1f]"
                          : "bg-[#ffe8e8] text-[#8b2b2b]"
                      }`}
                    >
                      {score}% Match
                    </span>
                  </div>

                  <p className="mb-4 line-clamp-4 text-sm text-slate-600">
                    {cleanDescription || "No description available"}
                  </p>

                  <div className="flex justify-between">

                    <a
                      href={jobLink}
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
              );
            })}

          </div>
        )}

      </main>

      <AppFooter className="mt-auto" />
    </div>
  );
}