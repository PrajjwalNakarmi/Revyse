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
      const results = await searchJobsBySkills(resume.skills);
      setJobs(results);
      setLoading(false);
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
          <p className="text-gray-500">Searching jobs...</p>
        )}

        {noResume && (
          <div className="bg-white p-10 rounded-xl shadow text-center text-gray-500">
            No resume found. Upload or select a resume to see job matches.
          </div>
        )}

        {!loading && !noResume && jobs.length === 0 && (
          <div className="bg-white p-10 rounded-xl shadow text-center text-gray-500">
            No jobs found based on your resume skills.
          </div>
        )}

        {!noResume && (
          <div className="grid md:grid-cols-2 gap-6">
            {jobs.map((job) => (
              <div
                key={job.id}
                className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      {job.title || "Job Title"}
                    </h3>

                    <p className="text-sm text-gray-500">
                      {job.company || "Company"}
                    </p>
                  </div>

                  <span
                    className={`px-3 py-1 text-xs rounded-full ${
                      job.matchScore >= 80
                        ? "bg-green-100 text-green-700"
                        : job.matchScore >= 60
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {job.matchScore}% Match
                  </span>
                </div>

                <p className="text-sm text-gray-600 mb-4">
                  {job.description || "No description available."}
                </p>

                {job.skills && job.skills.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {job.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2 py-1 bg-indigo-100 text-indigo-700 text-xs rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                )}

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