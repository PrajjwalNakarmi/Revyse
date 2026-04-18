import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import AppFooter from "../components/AppFooter";
import UploadModal from "../components/UploadModal";
import {
  getUserResumes,
  getUserStats,
  addUserResume,
  deleteUserResume,
} from "../services/userService";
import { uploadResumeForOCR } from "../services/ocrService";

export default function Dashboard() {
  const [user] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [resumes, setResumes] = useState([]);
  const [stats, setStats] = useState({
    totalResumes: 0,
    averageScore: 0,
    avgAtsScore: 0,
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return;

    const userResumes = getUserResumes(user.id);

    setResumes(userResumes);
    setStats(getUserStats(user.id));

    if (!userResumes || userResumes.length === 0) {
      localStorage.removeItem("selectedResume");
    }
  }, [user]);

  // UPDATED FUNCTION (PDF + IMAGE SUPPORT)
  const handleFileUpload = async (file) => {
    if (!user) return;

    if (!file) {
      alert("Please select a file before uploading");
      return;
    }

    // -------- FILE TYPE VALIDATION --------
    const allowedTypes = [
      "application/pdf",
      "image/png",
      "image/jpeg",
      "image/jpg",
      "image/webp",
    ];

    if (!file || !allowedTypes.includes(file.type)) {
      alert("Only PDF and image files (JPG, PNG) are allowed");
      return;
    }


    setIsUploading(true);

    try {
      const result = await uploadResumeForOCR(file);

      if (!result?.extractedText) {
        throw new Error("No text was extracted from this file.");
      }

      const resumeData = {
        fileName: result.fileName,
        name: `${user.name || user.fullName} - ${result.fileName.replace(/\.[^/.]+$/, "")}`,
        extractedText: result.extractedText,
        atsScore: result.atsScore ?? 0,
        score: result.atsScore ?? 0,
        method: result.method,
        skills: result.skills || [],
        aiImprovements: result.aiImprovements || [],
        uploadDate: new Date().toISOString(),
      };

      addUserResume(user.id, resumeData);

      const updatedResumes = getUserResumes(user.id);

      setResumes(updatedResumes);
      setStats(getUserStats(user.id));

      localStorage.setItem(
        "selectedResume",
        JSON.stringify(resumeData)
      );

      navigate("/analysis");

    } catch (error) {
      console.error(error);
      alert(error.message || "Resume analysis failed");
    } finally {
      setIsUploading(false);
      setIsUploadModalOpen(false);
    }
  };

  const handleDeleteResume = (resumeId) => {
    if (!user) return;

    const updatedResumes = deleteUserResume(user.id, resumeId);

    setResumes(updatedResumes);
    setStats(getUserStats(user.id));

    if (!updatedResumes || updatedResumes.length === 0) {
      localStorage.removeItem("selectedResume");
    }
  };

  if (!user) {
    return <div className="p-10 text-center">Loading dashboard...</div>;
  }

  const topResumes = resumes.slice(0, 5);

  return (
    <div className="min-h-screen flex flex-col bg-[#f5f4ef] text-slate-900">

      <Navbar onUploadClick={() => setIsUploadModalOpen(true)} />

      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6 lg:px-8">

        <section className="mb-8 overflow-hidden rounded-3xl border border-[#1f5d66]/15 bg-gradient-to-r from-[#0f2a34] via-[#15424b] to-[#1f5d66] px-6 py-8 text-white shadow-[0_24px_80px_-40px_rgba(15,42,52,0.65)] sm:px-8">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="mb-2 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-[#ffd4a8]">
                <span className="inline-flex h-2 w-2 rounded-full bg-[#f28f3b]" />
                Revyse Workspace
              </p>
              <h1 className="text-3xl font-semibold leading-tight sm:text-4xl">
                Welcome back, <span className="text-[#ffd4a8]">{user.name || user.fullName}</span>
              </h1>
              <p className="mt-2 max-w-xl text-sm text-slate-200 sm:text-base">
                Track resume impact, review ATS confidence, and launch your next role faster.
              </p>
            </div>

            <button
              onClick={() => setIsUploadModalOpen(true)}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#f28f3b] px-5 py-3 text-sm font-semibold text-[#142730] transition hover:-translate-y-0.5 hover:bg-[#f4a45e]"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 5v14" strokeLinecap="round" />
                <path d="M5 12h14" strokeLinecap="round" />
              </svg>
              Upload New Resume
            </button>
          </div>
        </section>

        <section className="mb-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <article className="glass-card rounded-2xl p-5">
            <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[#0f2a34] text-[#ffd4a8]">
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="4" y="4" width="16" height="16" rx="3" />
                <path d="M8 12h8" strokeLinecap="round" />
                <path d="M8 8h5" strokeLinecap="round" />
                <path d="M8 16h6" strokeLinecap="round" />
              </svg>
            </div>
            <p className="text-sm text-slate-500">Total Resumes</p>
            <p className="mt-1 text-3xl font-semibold text-slate-900">{stats.totalResumes}</p>
          </article>

          <article className="glass-card rounded-2xl p-5">
            <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[#194754] text-[#ffe4c5]">
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 18h16" strokeLinecap="round" />
                <path d="M7 14l3-3 3 2 4-5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <p className="text-sm text-slate-500">Average Score</p>
            <p className="mt-1 text-3xl font-semibold text-slate-900">{stats.averageScore}</p>
          </article>

          <article className="glass-card rounded-2xl p-5 sm:col-span-2 lg:col-span-1">
            <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[#f28f3b] text-[#11232b]">
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 3v18" strokeLinecap="round" />
                <path d="M4 12h16" strokeLinecap="round" />
                <circle cx="12" cy="12" r="8" />
              </svg>
            </div>
            <p className="text-sm text-slate-500">Average ATS Score</p>
            <p className="mt-1 text-3xl font-semibold text-slate-900">{stats.avgAtsScore}%</p>
          </article>
        </section>

        <section>
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-slate-900">Recent Resumes</h2>
              <p className="mt-1 text-sm text-slate-500">Open any resume to review insights or continue improving it.</p>
            </div>
          </div>

          {topResumes.length > 0 ? (
            <div className="space-y-4">
              {topResumes.map((resume) => (
                <article
                  key={resume.uploadDate}
                  className="glass-card flex flex-col gap-4 rounded-2xl p-5 sm:flex-row sm:items-center sm:justify-between"
                >
                  <button
                    type="button"
                    className="text-left"
                    onClick={() => {
                      localStorage.setItem("selectedResume", JSON.stringify(resume));
                      navigate("/analysis");
                    }}
                  >
                    <h3 className="font-semibold text-slate-900">{resume.name}</h3>
                    <p className="mt-1 text-sm text-slate-500">
                      Uploaded on {new Date(resume.uploadDate).toLocaleDateString()}
                    </p>
                  </button>

                  <div className="flex items-center gap-3 sm:gap-6">
                    <div className="flex gap-2">
                      <span className="rounded-full bg-[#e1f0f2] px-3 py-1 text-xs font-semibold text-[#11414a]">
                        Score {resume.score}/100
                      </span>
                      <span className="rounded-full bg-[#ffe7cf] px-3 py-1 text-xs font-semibold text-[#8f4e1b]">
                        ATS {resume.atsScore}%
                      </span>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteResume(resume.uploadDate);
                      }}
                      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#8b2b2b]/20 text-[#8b2b2b] transition hover:bg-[#fff0f0]"
                      title="Remove resume"
                    >
                      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M5 7h14" strokeLinecap="round" />
                        <path d="M10 11v6" strokeLinecap="round" />
                        <path d="M14 11v6" strokeLinecap="round" />
                        <path d="M9 7V5h6v2" strokeLinecap="round" />
                        <path d="M7 7l1 12h8l1-12" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <article className="glass-card rounded-2xl p-10 text-center">
              <div className="mx-auto mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[#0f2a34] text-[#ffd4a8]">
                <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="4" y="4" width="16" height="16" rx="3" />
                  <path d="M12 8v8" strokeLinecap="round" />
                  <path d="M8 12h8" strokeLinecap="round" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-slate-900">No resumes uploaded yet</h3>
              <p className="mt-2 text-sm text-slate-500">Upload your first resume to unlock ATS analysis and job matching.</p>
              <button
                onClick={() => setIsUploadModalOpen(true)}
                className="mt-5 inline-flex items-center justify-center gap-2 rounded-full bg-[#0f2a34] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#15424b]"
              >
                Upload Resume
              </button>
            </article>
          )}
        </section>

      </main>

      {/* UPLOAD MODAL */}
      {isUploadModalOpen && (
        <UploadModal
          isOpen={isUploadModalOpen}
          onClose={() => setIsUploadModalOpen(false)}
          onUpload={handleFileUpload}
          isUploading={isUploading}
        />
      )}

      <AppFooter className="mt-auto" />

    </div>
  );
}