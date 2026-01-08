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
import "./dashboard.css";

export default function Dashboard() {
  const [user, setUser] = useState(() => {
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

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const getDisplayName = () => {
    return user?.name || user?.fullName || "User";
  };

  const handleUploadClick = () => {
    setIsUploadModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsUploadModalOpen(false);
  };

  const handleFileUpload = async (file) => {
    if (!user) return;

    setIsUploading(true);
    try {
      const ocrResult = await uploadResumeForOCR(file);

      const resumeData = {
        fileName: file.name,
        name: `${getDisplayName()} - ${file.name.replace(/\.[^/.]+$/, "")}`,
        uploadDate: new Date().toISOString(),
        extractedText: ocrResult.text,
        method: ocrResult.method,
        score: 0,
        atsScore: 0,
        experiences: 0,
        skills: 0,
      };

      addUserResume(user.id, resumeData);

      setResumes(getUserResumes(user.id));
      setStats(getUserStats(user.id));

      navigate("/analysis");
    } catch (err) {
      alert("OCR failed. Try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleDeleteResume = (e, resume) => {
    e.stopPropagation(); // Prevent card click from firing
    
    if (window.confirm("Are you sure you want to delete this resume?")) {
      // Use id if available, otherwise use uploadDate as identifier
      const identifier = resume.id || resume.uploadDate;
      deleteUserResume(user.id, identifier);
      setResumes(getUserResumes(user.id));
      setStats(getUserStats(user.id));
    }
  };

  if (!user) {
    return <div>Loading dashboard...</div>;
  }

  return (
    <div className="dashboard">
      <Navbar onUploadClick={handleUploadClick} />

      <main className="dashboard-content">
        {/* Welcome */}
        <div className="welcome-section">
          <h1 className="welcome-title">
            Welcome back,{" "}
            <span className="welcome-name">{getDisplayName()}</span>
          </h1>
          <p className="welcome-subtitle">
            Here's an overview of your resume analytics and recent uploads.
          </p>
        </div>

        {/* Stats */}
        <section className="resumes-section">
          <div className="section-header">
            <h2 className="section-title">Your Resumes</h2>
          </div>

          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-value">{stats.totalResumes}</div>
              <div className="stat-label">Total Resumes</div>
            </div>

            <div className="stat-card">
              <div className="stat-value">{stats.averageScore}</div>
              <div className="stat-label">Average Score</div>
            </div>

            <div className="stat-card">
              <div className="stat-value">{stats.avgAtsScore}%</div>
              <div className="stat-label">Avg ATS Score</div>
            </div>
          </div>
        </section>

        {/* Recent Resumes */}
        <section className="recent-resumes-section">
          <h2 className="section-title">Recent Resumes</h2>

          {resumes.length > 0 ? (
            <div className="resume-list">
              {resumes.slice(0, 5).map((resume) => (
                <div
                  key={resume.uploadDate}
                  className="resume-card"
                  onClick={() => {
                    localStorage.setItem("selectedResume", JSON.stringify(resume));
                    navigate("/analysis");
                  }}
                >
                  <div className="resume-card-left">
                    <div className="resume-info">
                      <h3 className="resume-name">{resume.name}</h3>
                      <div className="resume-meta">
                        <span>{formatDate(resume.uploadDate)}</span>
                        <span>•</span>
                        <span>{resume.experiences} experiences</span>
                        <span>•</span>
                        <span>{resume.skills} skills</span>
                      </div>
                    </div>
                  </div>

                  <div className="resume-card-right">
                    <div className="resume-scores">
                      <div className="score-box">
                        <span>Score:</span>
                        <span>{resume.score}/100</span>
                      </div>
                      <div className="ats-box">
                        <span className="ats-label">ATS:</span>
                        <span className="ats-value">{resume.atsScore}%</span>
                      </div>
                    </div>
                    <button
                      className="delete-resume-btn"
                      onClick={(e) => handleDeleteResume(e, resume)}
                      aria-label="Delete resume"
                      title="Delete resume"
                    >
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path
                          d="M5 5L15 15M15 5L5 15"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-resumes">
              No resumes uploaded yet.
            </div>
          )}
        </section>
      </main>

      <UploadModal
        isOpen={isUploadModalOpen}
        onClose={handleCloseModal}
        onUpload={handleFileUpload}
        isUploading={isUploading}
      />
    </div>
  );
}
