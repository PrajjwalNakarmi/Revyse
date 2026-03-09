import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

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
    return <div className="p-10 text-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          Saved Jobs
        </h1>

        {savedJobs.length === 0 ? (
          <div className="bg-white p-10 rounded-xl shadow text-center text-gray-500">
            No saved jobs yet
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {savedJobs.map((job) => (
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
                  {job.skills?.map((skill) => (
                    <span
                      key={skill}
                      className="px-2 py-1 bg-indigo-100 text-indigo-700 text-xs rounded-full"
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
                    className="text-indigo-600 text-sm font-medium hover:underline"
                  >
                    Apply →
                  </a>

                  <button
                    onClick={() => removeJob(job.id)}
                    className="text-red-500 text-sm hover:underline"
                  >
                    Remove
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