import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import UploadModal from "../components/UploadModal";
import { analyzeCV, saveAnalysisData } from "../services/cvAnalysis";
import {
  getUserResumes,
  getUserStats,
  addUserResume,
} from "../services/userService";

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

    setResumes(getUserResumes(user.id));
    setStats(getUserStats(user.id));
  }, [user]);

  const handleFileUpload = async (file) => {
    if (!user) return;

    setIsUploading(true);
    try {
      const analysisData = await analyzeCV(file);
      saveAnalysisData(analysisData);

      const resumeData = {
        fileName: file.name,
        name: `${user.name || user.fullName} - ${file.name.replace(
          /\.[^/.]+$/,
          ""
        )}`,
        uploadDate: new Date().toISOString(),
        score: analysisData.overallScore,
        atsScore: analysisData.atsScore,
        experiences: analysisData.extractedInfo.experienceCount,
        skills: analysisData.extractedInfo.skillsCount,
        analysisData,
      };

      addUserResume(user.id, resumeData);

      setResumes(getUserResumes(user.id));
      setStats(getUserStats(user.id));

      localStorage.setItem("selectedResume", JSON.stringify(resumeData));
      navigate("/analysis");
    } catch (err) {
      console.error(err);
      alert("Failed to analyze resume");
    } finally {
      setIsUploading(false);
    }
  };

  if (!user) {
    return <div className="p-10 text-center">Loading dashboard...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar onUploadClick={() => setIsUploadModalOpen(true)} />

      <main className="max-w-7xl mx-auto px-6 py-10">
        {/* Welcome */}
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

        {/* Stats */}
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

        {/* Recent Resumes */}
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Recent Resumes
          </h2>

          {resumes.length > 0 ? (
            <div className="space-y-4">
              {resumes.slice(0, 5).map((resume) => (
                <div
                  key={resume.uploadDate}
                  onClick={() => {
                    localStorage.setItem(
                      "selectedResume",
                      JSON.stringify(resume)
                    );
                    navigate("/analysis");
                  }}
                  className="bg-white p-6 rounded-xl shadow flex justify-between items-center cursor-pointer hover:shadow-md transition"
                >
                  <div>
                    <h3 className="font-semibold text-gray-800">
                      {resume.name}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">
                      {new Date(resume.uploadDate).toLocaleDateString()} •{" "}
                      {resume.experiences || 0} experiences •{" "}
                      {resume.skills || 0} skills
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-sm font-semibold text-gray-800">
                      Score: {resume.score}/100
                    </p>
                    <p className="text-sm text-gray-500">
                      ATS: {resume.atsScore}%
                    </p>
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
