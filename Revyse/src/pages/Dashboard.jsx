import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
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

    // Clear selected resume if user has no resumes
    if (!userResumes || userResumes.length === 0) {
      localStorage.removeItem("selectedResume");
    }

  }, [user]);

  const handleFileUpload = async (file) => {
    if (!user) return;

    setIsUploading(true);

    try {
      const result = await uploadResumeForOCR(file);

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
      alert("Resume analysis failed");
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

    // Clear selected resume if none remain
    if (!updatedResumes || updatedResumes.length === 0) {
      localStorage.removeItem("selectedResume");
    }
  };

  if (!user) {
    return <div className="p-10 text-center">Loading dashboard...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">

      <Navbar onUploadClick={() => setIsUploadModalOpen(true)} />

      <main className="max-w-7xl mx-auto px-6 py-10">

        <div className="mb-10">
          <h1 className="text-3xl font-bold text-gray-800">
            Welcome back,{" "}
            <span className="text-indigo-600">
              {user.name || user.fullName}
            </span>
          </h1>

          <p className="text-gray-500 mt-2">
            Here is an overview of your resumes and analytics
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">

          <div className="bg-white p-6 rounded-xl shadow">
            <p className="text-sm text-gray-500">Total Resumes</p>
            <p className="text-3xl font-bold text-gray-800 mt-2">
              {stats.totalResumes}
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <p className="text-sm text-gray-500">Average Score</p>
            <p className="text-3xl font-bold text-gray-800 mt-2">
              {stats.averageScore}
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <p className="text-sm text-gray-500">Avg ATS Score</p>
            <p className="text-3xl font-bold text-gray-800 mt-2">
              {stats.avgAtsScore}%
            </p>
          </div>

        </div>

        <div>

          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Recent Resumes
          </h2>

          {resumes.length > 0 ? (

            <div className="space-y-4">

              {resumes.slice(0, 5).map((resume) => (

                <div
                  key={resume.uploadDate}
                  className="bg-white p-6 rounded-xl shadow flex justify-between items-center"
                >

                  <div
                    className="cursor-pointer"
                    onClick={() => {
                      localStorage.setItem(
                        "selectedResume",
                        JSON.stringify(resume)
                      );
                      navigate("/analysis");
                    }}
                  >

                    <h3 className="font-semibold text-gray-800">
                      {resume.name}
                    </h3>

                    <p className="text-sm text-gray-500 mt-1">
                      {new Date(resume.uploadDate).toLocaleDateString()}
                    </p>

                  </div>

                  <div className="flex items-center gap-6">

                    <div className="text-right">

                      <p className="text-sm font-semibold text-gray-800">
                        Score: {resume.score}/100
                      </p>

                      <p className="text-sm text-gray-500">
                        ATS: {resume.atsScore}%
                      </p>

                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteResume(resume.uploadDate);
                      }}
                      className="w-8 h-8 flex items-center justify-center rounded-full
                      text-gray-400 hover:text-red-600 hover:bg-red-50 transition"
                      title="Remove resume"
                    >
                      ×
                    </button>

                  </div>

                </div>

              ))}

            </div>

          ) : (

            <div className="bg-white p-10 rounded-xl shadow text-center text-gray-500">
              No resumes uploaded yet
            </div>

          )}

        </div>

      </main>

      <UploadModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onUpload={handleFileUpload}
        isUploading={isUploading}
      />

    </div>
  );
}