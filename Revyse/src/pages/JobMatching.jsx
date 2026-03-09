import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

export default function JobMatching() {
  const [resume, setResume] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const storedResume = localStorage.getItem("selectedResume");

    if (storedResume) {
      const parsed = JSON.parse(storedResume);
      setResume(parsed);
      fetchJobMatches(parsed);
    }
  }, []);

  const fetchJobMatches = async (resumeData) => {
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/jobs/match", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          resumeText: resumeData.extractedText,
          skills: resumeData.skills,
        }),
      });

      const data = await response.json();
      setJobs(data.jobs || []);
    } catch (err) {
      console.error("Job match error:", err);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          Job Matching
        </h1>

        {!resume && (
          <div className="bg-white p-8 rounded-xl shadow text-center text-gray-500">
            Upload a resume first to see job matches.
          </div>
        )}

        {resume && (
          <>
            {/* Resume Info */}
            <div className="bg-white p-6 rounded-xl shadow mb-8">
              <h2 className="font-semibold text-gray-700 mb-2">
                Resume Used
              </h2>

              <p className="text-gray-800 font-medium">
                {resume.fileName}
              </p>

              <p className="text-sm text-gray-500">
                ATS Score: {resume.atsScore}%
              </p>
            </div>

            {/* Job Results */}
            {loading ? (
              <div className="bg-white p-10 rounded-xl shadow text-center">
                <p className="text-gray-500">Finding matching jobs...</p>
              </div>
            ) : jobs.length > 0 ? (
              <div className="grid md:grid-cols-2 gap-6">
                {jobs.map((job, index) => (
                  <div
                    key={index}
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

                    <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                      {job.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {job.skills?.map((skill) => (
                        <span
                          key={skill}
                          className="px-2 py-1 bg-indigo-100 text-indigo-700 text-xs rounded-full"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>

                    <a
                      href={job.applyLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block mt-2 text-sm font-medium text-indigo-600 hover:underline"
                    >
                      Apply Now →
                    </a>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white p-10 rounded-xl shadow text-center text-gray-500">
                No matching jobs found.
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}