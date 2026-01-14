import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Analysis() {
  const [resume, setResume] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedResume = localStorage.getItem("selectedResume");

    if (!storedResume) {
      navigate("/dashboard");
      return;
    }

    setResume(JSON.parse(storedResume));
  }, [navigate]);

  if (!resume) {
    return <div className="p-10 text-center">Loading analysis...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          Resume Analysis
        </h1>

        {/* Scores */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="font-semibold text-gray-700 mb-2">
              Overall Score
            </h3>

            <div className="flex items-baseline gap-2 mb-4">
              <span className="text-5xl font-bold text-gray-800">
                {resume.score ?? resume.atsScore ?? 0}
              </span>
              <span className="text-xl text-gray-400">/100</span>
            </div>

            <div className="w-full h-2 bg-gray-200 rounded">
              <div
                className="h-2 bg-indigo-500 rounded"
                style={{
                  width: `${resume.score ?? resume.atsScore ?? 0}%`,
                }}
              />
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="font-semibold text-gray-700 mb-2">
              ATS Compatibility
            </h3>

            <div className="flex items-baseline gap-2 mb-4">
              <span className="text-5xl font-bold text-gray-800">
                {resume.atsScore ?? 0}
              </span>
              <span className="text-xl text-gray-400">%</span>
            </div>

            <div className="w-full h-2 bg-gray-200 rounded">
              <div
                className="h-2 bg-green-500 rounded"
                style={{ width: `${resume.atsScore ?? 0}%` }}
              />
            </div>
          </div>
        </div>

        {/* Extracted Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="font-semibold text-gray-700 mb-4">
              Extracted Information
            </h3>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">File Name</span>
                <span className="font-medium text-gray-800">
                  {resume.fileName}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500">Extraction Method</span>
                <span className="font-medium text-gray-800">
                  {resume.method}
                </span>
              </div>
            </div>
          </div>

          {/* Skills */}
          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="font-semibold text-gray-700 mb-4">
              Detected Skills
            </h3>

            {resume.skills && resume.skills.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {resume.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 bg-indigo-100 text-indigo-700 text-sm rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500">
                No skills detected
              </p>
            )}
          </div>
        </div>

        {/*  CLEAN AI IMPROVEMENTS UI */}
        <div className="bg-white p-6 rounded-xl shadow mb-10">
          <h3 className="font-semibold text-gray-700 mb-5">
            AI Improvement Suggestions
          </h3>

          {resume.aiImprovements && resume.aiImprovements.length > 0 ? (
            <div className="space-y-4">
              {resume.aiImprovements
                // remove headings / markdown noise
                .filter(
                  (item) =>
                    !item.toLowerCase().includes("improvement") &&
                    !item.toLowerCase().includes("education") &&
                    !item.toLowerCase().includes("projects") &&
                    !item.toLowerCase().includes("summary") &&
                    !item.startsWith("**")
                )
                .map((item, index) => (
                  <div
                    key={index}
                    className="flex gap-4 items-start border-l-4 border-indigo-500 bg-indigo-50/40 p-4 rounded-md"
                  >
                    {/* Number */}
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center text-sm font-semibold">
                      {index + 1}
                    </div>

                    {/* Text */}
                    <p className="text-sm text-gray-700 leading-relaxed">
                      {item.replace(/^[-+•*]\s*/, "")}
                    </p>
                  </div>
                ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500">
              No AI suggestions available
            </p>
          )}
        </div>

        {/* OCR Text */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="font-semibold text-gray-700 mb-4">
            Extracted Resume Text
          </h3>

          <pre className="whitespace-pre-wrap text-sm text-gray-700 leading-relaxed max-h-[500px] overflow-y-auto">
            {resume.extractedText || "No text extracted."}
          </pre>
        </div>
      </main>
    </div>
  );
}
