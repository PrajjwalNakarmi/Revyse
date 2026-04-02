import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import AppFooter from "../components/AppFooter";

export default function Analysis() {
  const [resume, setResume] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedResume = localStorage.getItem("selectedResume");

    if (!storedResume) {
      setResume(null);
      return;
    }

    const parsedResume = JSON.parse(storedResume);

    // Validate resume object
    if (!parsedResume || !parsedResume.fileName) {
      setResume(null);
      return;
    }

    setResume(parsedResume);
  }, []);

  // If no resume uploaded
  if (!resume) {
    return (
      <div className="min-h-screen flex flex-col bg-[#f5f4ef] text-slate-900">
        <Navbar />

        <main className="mx-auto flex w-full max-w-7xl flex-1 items-center justify-center px-6 py-16">
          <div className="glass-card w-full max-w-lg rounded-3xl p-10 text-center">
            <div className="mx-auto mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0f2a34] text-[#ffd4a8]">
              <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M7 4h8l4 4v12H7z" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M15 4v4h4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-slate-900 mb-2">
              No Resume Uploaded
            </h2>

            <p className="text-slate-600 mb-5">
              Please upload a resume from the dashboard to view analysis.
            </p>

            <button
              onClick={() => navigate("/dashboard")}
              className="rounded-full bg-[#0f2a34] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#15424b]"
            >
              Go to Dashboard
            </button>
          </div>
        </main>

        <AppFooter className="mt-auto" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#f5f4ef] text-slate-900">
      <Navbar />

      <main className="max-w-7xl mx-auto w-full flex-1 px-6 py-10">
        <section className="mb-8 overflow-hidden rounded-3xl border border-[#1f5d66]/15 bg-gradient-to-r from-[#0f2a34] via-[#15424b] to-[#1f5d66] px-6 py-8 text-white shadow-[0_24px_80px_-40px_rgba(15,42,52,0.65)] sm:px-8">
          <p className="mb-2 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-[#ffd4a8]">
            <span className="inline-flex h-2 w-2 rounded-full bg-[#f28f3b]" />
            Revyse Analysis
          </p>
          <h1 className="text-3xl font-semibold leading-tight sm:text-4xl">
            Resume analysis overview
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-slate-200 sm:text-base">
            Review your ATS readiness, extracted skills, and AI-driven recommendations in one workspace.
          </p>
        </section>

        {/* Scores */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">

          <div className="glass-card rounded-2xl p-6">
            <h3 className="font-semibold text-slate-700 mb-2">
              Overall Score
            </h3>

            <div className="flex items-baseline gap-2 mb-4">
              <span className="text-5xl font-bold text-slate-900">
                {resume.score ?? resume.atsScore ?? 0}
              </span>
              <span className="text-xl text-slate-400">/100</span>
            </div>

            <div className="w-full h-2 bg-[#dce6e8] rounded-full">
              <div
                className="h-2 rounded-full bg-[#1f5d66]"
                style={{
                  width: `${resume.score ?? resume.atsScore ?? 0}%`
                }}
              />
            </div>
          </div>

          <div className="glass-card rounded-2xl p-6">
            <h3 className="font-semibold text-slate-700 mb-2">
              ATS Compatibility
            </h3>

            <div className="flex items-baseline gap-2 mb-4">
              <span className="text-5xl font-bold text-slate-900">
                {resume.atsScore ?? 0}
              </span>
              <span className="text-xl text-slate-400">%</span>
            </div>

            <div className="w-full h-2 bg-[#dce6e8] rounded-full">
              <div
                className="h-2 rounded-full bg-[#f28f3b]"
                style={{ width: `${resume.atsScore ?? 0}%` }}
              />
            </div>
          </div>

        </div>

        {/* Extracted Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">

          <div className="glass-card rounded-2xl p-6">
            <h3 className="font-semibold text-slate-700 mb-4">
              Extracted Information
            </h3>

            <div className="space-y-3 text-sm">

              <div className="flex justify-between">
                <span className="text-slate-500">File Name</span>
                <span className="font-medium text-slate-800">
                  {resume.fileName}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-slate-500">Extraction Method</span>
                <span className="font-medium text-slate-800">
                  {resume.method}
                </span>
              </div>

            </div>
          </div>

          {/* Skills */}
          <div className="glass-card rounded-2xl p-6">
            <h3 className="font-semibold text-slate-700 mb-4">
              Detected Skills
            </h3>

            {resume.skills && resume.skills.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {resume.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full bg-[#e1f0f2] px-3 py-1 text-sm font-medium text-[#11414a]"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-sm text-slate-500">
                No skills detected
              </p>
            )}
          </div>

        </div>

        {/* AI Improvements */}
        <div className="glass-card mb-10 rounded-2xl p-6">
          <h2 className="text-2xl md:text-3xl font-semibold text-slate-900 mb-6">
            AI Improvement Suggestions
          </h2>

          {resume.aiImprovements && resume.aiImprovements.length > 0 ? (
            <div className="space-y-5">

              {(() => {
                let counter = 1;

                return resume.aiImprovements.map((item, index) => {
                  const cleanItem = item.replace(/^[-+•*]\s*/, "").trim();

                  const isHeading =
                    cleanItem.endsWith(":**") ||
                    (cleanItem.endsWith(":") &&
                      cleanItem.length < 40 &&
                      !cleanItem.toLowerCase().includes("use") &&
                      !cleanItem.toLowerCase().includes("remove") &&
                      !cleanItem.toLowerCase().includes("add"));

                  if (isHeading) {
                    return (
                      <h4
                        key={`heading-${index}`}
                        className="mt-4 text-sm font-semibold uppercase tracking-wide text-slate-800"
                      >
                        {cleanItem.replace(/[:*]/g, "")}
                      </h4>
                    );
                  }

                  if (!cleanItem) return null;

                  return (
                    <div
                      key={`point-${index}`}
                      className="flex items-start gap-4 rounded-xl border border-[#1f5d66]/15 bg-[#eef5f6] p-4"
                    >
                      <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[#0f2a34] text-sm font-semibold text-[#ffd4a8]">
                        {counter++}
                      </div>

                      <p className="text-sm leading-relaxed text-slate-700">
                        {cleanItem}
                      </p>
                    </div>
                  );
                });
              })()}

            </div>
          ) : (
            <p className="text-sm text-slate-500">
              No AI suggestions available
            </p>
          )}
        </div>

        {/* OCR Text */}
        <div className="glass-card rounded-2xl p-6">
          <h3 className="mb-4 font-semibold text-slate-700">
            Extracted Resume Text
          </h3>

          <pre className="max-h-[500px] overflow-y-auto whitespace-pre-wrap rounded-xl border border-[#1f5d66]/10 bg-white/70 p-4 text-sm leading-relaxed text-slate-700">
            {resume.extractedText || "No text extracted."}
          </pre>
        </div>

      </main>

      <AppFooter className="mt-auto" />
    </div>
  );
}