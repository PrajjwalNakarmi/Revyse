import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

export default function JobMatching() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const demoJobs = [
      {
        id: "1",
        title: "Frontend Developer",
        company: "Google",
        description: "React developer role building modern web apps.",
        skills: ["react", "javascript", "css"],
        matchScore: 85,
        applyLink: "https://careers.google.com"
      },
      {
        id: "2",
        title: "Backend Engineer",
        company: "Amazon",
        description: "Node.js backend developer role.",
        skills: ["node.js", "mongodb", "express"],
        matchScore: 72,
        applyLink: "https://amazon.jobs"
      }
    ];

    setJobs(demoJobs);
  }, []);

  const saveJob = (job) => {
    const user = JSON.parse(localStorage.getItem("user"));

    const key = `savedJobs_${user.id}`;

    const existing = JSON.parse(localStorage.getItem(key)) || [];

    if (existing.find((j) => j.id === job.id)) {
      alert("Job already saved");
      return;
    }

    const updated = [...existing, job];

    localStorage.setItem(key, JSON.stringify(updated));

    alert("Job saved!");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          Job Matching
        </h1>

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
                </div>

                <span
                  className={`px-3 py-1 text-xs rounded-full ${
                    job.matchScore > 80
                      ? "bg-green-100 text-green-700"
                      : job.matchScore > 60
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {job.matchScore}% Match
                </span>
              </div>

              <p className="text-sm text-gray-600 mb-4">
                {job.description}
              </p>

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
      </main>
    </div>
  );
}