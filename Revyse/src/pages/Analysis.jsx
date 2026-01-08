import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { extractSkillsFromText } from "../utils/skillsExtractor";
import "./analysis.css";

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
    return <div>Loading analysis...</div>;
  }

  // SKILL EXTRACTION
  const skills = extractSkillsFromText(resume.extractedText);

  return (
    <div className="dashboard">
      <Navbar />

      <main className="dashboard-content">
        <div className="analysis-grid">

          {/* Overall Score */}
          <div className="analysis-card">
            <div className="analysis-card-header">
              <h3 className="analysis-card-title">Overall Score</h3>
              <p className="analysis-card-subtitle">
                Resume quality overview
              </p>
            </div>

            <div className="score-display">
              <span className="score-value-large">
                {resume.score ?? 0}
              </span>
              <span className="score-divider">/</span>
              <span className="score-max">100</span>
            </div>

            <div className="progress-bar-container">
              <div
                className="progress-bar"
                style={{
                  width: `${resume.score ?? 0}%`,
                  background: "#667eea",
                }}
              />
            </div>
          </div>

          {/* ATS Score */}
          <div className="analysis-card">
            <div className="analysis-card-header">
              <h3 className="analysis-card-title">ATS Compatibility</h3>
              <p className="analysis-card-subtitle">
                Applicant Tracking System score
              </p>
            </div>

            <div className="score-display">
              <span className="score-value-large">
                {resume.atsScore ?? 0}
              </span>
              <span className="score-unit">%</span>
            </div>

            <div className="progress-bar-container">
              <div
                className="progress-bar"
                style={{
                  width: `${resume.atsScore ?? 0}%`,
                  background: "#10b981",
                }}
              />
            </div>
          </div>

          {/* Extracted Information */}
          <div className="analysis-card">
            <div className="analysis-card-header">
              <h3 className="analysis-card-title">Extracted Information</h3>
              <p className="analysis-card-subtitle">
                Information detected from resume
              </p>
            </div>

            <div className="extracted-info">
              <div className="info-row">
                <span className="info-label">Method</span>
                <span className="info-value">{resume.method}</span>
              </div>

              <div className="info-row">
                <span className="info-label">File</span>
                <span className="info-value">{resume.fileName}</span>
              </div>
            </div>
          </div>

          {/* SKILLS (REAL EXTRACTION) */}
          <div className="analysis-card">
            <div className="analysis-card-header">
              <h3 className="analysis-card-title">Skills</h3>
              <p className="analysis-card-subtitle">
                Automatically extracted from resume text
              </p>
            </div>

            <div className="skills-tags">
              {skills.length > 0 ? (
                skills.map((skill) => (
                  <span key={skill} className="skill-tag">
                    {skill}
                  </span>
                ))
              ) : (
                <span className="skill-tag">No skills detected</span>
              )}
            </div>
          </div>

          {/* OCR Extracted Text */}
          <div className="analysis-card full-width">
            <div className="analysis-card-header">
              <h3 className="analysis-card-title">
                Extracted Resume Text
              </h3>
              <p className="analysis-card-subtitle">
                Raw text extracted using {resume.method}
              </p>
            </div>

            <pre
              style={{
                whiteSpace: "pre-wrap",
                fontSize: "14px",
                color: "#374151",
                lineHeight: "1.6",
              }}
            >
              {resume.extractedText || "No text extracted."}
            </pre>
          </div>

        </div>
      </main>
    </div>
  );
}
