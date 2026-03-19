import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
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
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 py-10">

        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          Job Matching
        </h1>

        {loading && (
          <p className="text-gray-500">Loading jobs...</p>
        )}

        {noResume && (
          <div className="bg-white p-10 rounded-xl shadow text-center text-gray-500">
            No resume found. Upload or select a resume first.
          </div>
        )}

        {!loading && !noResume && jobs.length === 0 && (
          <div className="bg-white p-10 rounded-xl shadow text-center text-gray-500">
            No jobs available right now. Try again later.
          </div>
        )}

        {!noResume && jobs.length > 0 && (
          <div className="grid md:grid-cols-2 gap-6">

            {jobs.map((job) => (
              <div
                key={job.id}
                className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition"
              >

                <div className="flex justify-between items-start mb-4">

                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      {job.title}
                    </h3>

                    <p className="text-sm text-gray-500">
                      {job.company}
                    </p>

                    <p className="text-xs text-gray-400">
                      {job.location}
                    </p>
                  </div>

                  <span
                    className={`px-3 py-1 text-xs rounded-full ${
                      job.matchScore >= 70
                        ? "bg-green-100 text-green-700"
                        : job.matchScore >= 40
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {job.matchScore}% Match
                  </span>
                </div>

                <p className="text-sm text-gray-600 mb-4 line-clamp-4">
                  {job.description}
                </p>

                <div className="flex justify-between">

                  <a
                    href={job.applyLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-600 text-sm font-medium hover:underline"
                  >
                    Apply →
                  </a>

                  <button
                    onClick={() => saveJob(job)}
                    className="text-indigo-600 text-sm font-medium hover:underline"
                  >
                    Save Job
                  </button>

                </div>

              </div>
            ))}

          </div>
        )}

      </main>
    </div>
  );
}