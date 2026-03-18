import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import html2pdf from "html2pdf.js";

export default function ResumeBuilder() {
  const [resumeData, setResumeData] = useState(null);
  const [isAIEnhanced, setIsAIEnhanced] = useState(false);
  const [isLoadingAI, setIsLoadingAI] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    linkedin: "",
    summary: "",
    skills: "",
    experience: "",
    education: "",
    projects: "",
    certifications: ""
  });

  useEffect(() => {
    const storedResume = localStorage.getItem("selectedResume");

    if (storedResume) {
      const parsed = JSON.parse(storedResume);
      const text = parsed.extractedText || "";

      setResumeData(parsed);

      setFormData({
        name: parsed.fileName?.replace(".pdf", "") || "",
        email: "",
        phone: "",
        linkedin: extractLinkedIn(text),

        summary: generateSummary(parsed.skills || []),
        skills: parsed.skills?.join("\n") || "",

        experience:
          extractSection(text, ["experience", "work", "employment"]) ||
          text.split("\n").slice(0, 8).join("\n"),

        education: extractEducation(text), // FIXED
        projects: extractSection(text, ["project"]),
        certifications: extractSection(text, ["certification"])
      });
    }
  }, []);

  const generateSummary = (skills) => {
    if (!skills.length) return "";
    return `Motivated professional skilled in ${skills.join(", ")}.`;
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // ---------- GENERIC SECTION ----------
  const extractSection = (text, keywords) => {
    if (!text) return "";

    const lines = text.split("\n");
    let startIndex = -1;

    for (let i = 0; i < lines.length; i++) {
      if (keywords.some(k => lines[i].toLowerCase().includes(k))) {
        startIndex = i;
        break;
      }
    }

    if (startIndex === -1) return "";

    const result = [];

    for (let i = startIndex + 1; i < lines.length; i++) {
      const line = lines[i].trim();

      if (
        line.match(/^(skills|projects|experience|certifications|tools)/i)
      ) break;

      if (line) result.push(line);
    }

    return result.join("\n");
  };

  // ---------- STRICT EDUCATION FIX ----------
  const extractEducation = (text) => {
    if (!text) return "";

    const lines = text.split("\n");
    let startIndex = -1;

    for (let i = 0; i < lines.length; i++) {
      if (lines[i].toLowerCase().includes("education")) {
        startIndex = i;
        break;
      }
    }

    if (startIndex === -1) return "";

    const result = [];

    for (let i = startIndex + 1; i < lines.length; i++) {
      const line = lines[i].trim();

      if (
        line.match(/^(skills|projects|experience|certifications|tools)/i)
      ) break;

      // ONLY allow real education lines
      if (
        line.toLowerCase().includes("university") ||
        line.toLowerCase().includes("college") ||
        line.toLowerCase().includes("school") ||
        line.toLowerCase().includes("bsc") ||
        line.toLowerCase().includes("bachelor") ||
        line.toLowerCase().includes("master") ||
        line.match(/\d{4}/)
      ) {
        result.push(line);
      }
    }

    return result.slice(0, 3).join("\n"); // keep only clean lines
  };

  const extractLinkedIn = (text) => {
    const match = text.match(/linkedin\.com\/[^\s]+/i);
    return match ? match[0] : "";
  };

  const formatList = (text) =>
    text.split("\n").map(t => t.trim()).filter(Boolean);

  // ---------- AI ----------
  const generateAIImprovedContent = async () => {
    if (!resumeData) return;

    setIsLoadingAI(true);

    try {
      const response = await fetch("http://localhost:5000/api/ai/generate-resume", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: resumeData.extractedText })
      });

      const data = await response.json();
      const output = data.content || "";

      const extract = (label) =>
        output.match(new RegExp(`${label}:\\s*([\\s\\S]*?)(?=\\n[A-Z]+:|$)`))?.[1]?.trim();

      const summary = extract("SUMMARY");
      const skills = extract("SKILLS");
      const experience = extract("EXPERIENCE");
      const education = extract("EDUCATION");
      const projects = extract("PROJECTS");

      setFormData((prev) => ({
        ...prev,
        summary: summary || prev.summary,
        skills: skills?.replace(/[-•*]\s*/g, "").replace(/,/g, "\n") || prev.skills,
        experience: experience || prev.experience,
        education: education || prev.education,
        projects: projects || prev.projects
      }));

      setIsAIEnhanced(true);

    } catch (err) {
      console.error("AI error", err);
      alert("AI failed");
    } finally {
      setIsLoadingAI(false);
    }
  };

  const downloadPDF = () => {
    const element = document.getElementById("resume-preview");
    html2pdf().from(element).save();
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 py-10">

        <h1 className="text-3xl font-bold mb-8">
          Resume Builder
        </h1>

        <div className="grid md:grid-cols-2 gap-8">

          <div className="bg-white p-6 rounded-xl shadow space-y-4">

            <input name="name" value={formData.name} onChange={handleChange} placeholder="Full Name" className="w-full border p-2 rounded" />
            <input name="email" value={formData.email} onChange={handleChange} placeholder="Email" className="w-full border p-2 rounded" />
            <input name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" className="w-full border p-2 rounded" />
            <input name="linkedin" value={formData.linkedin} onChange={handleChange} placeholder="LinkedIn" className="w-full border p-2 rounded" />

            <textarea name="summary" value={formData.summary} onChange={handleChange} rows="3" className="w-full border p-2 rounded" />
            <textarea name="skills" value={formData.skills} onChange={handleChange} rows="3" className="w-full border p-2 rounded" />
            <textarea name="experience" value={formData.experience} onChange={handleChange} rows="4" className="w-full border p-2 rounded" />
            <textarea name="projects" value={formData.projects} onChange={handleChange} rows="3" className="w-full border p-2 rounded" />
            <textarea name="education" value={formData.education} onChange={handleChange} rows="3" className="w-full border p-2 rounded" />

            <div className="flex gap-3">

              <button
                onClick={generateAIImprovedContent}
                className="bg-green-600 text-white px-4 py-2 rounded"
              >
                {isLoadingAI ? "Improving..." : "Enhance with AI"}
              </button>

              <button
                onClick={downloadPDF}
                className="bg-indigo-600 text-white px-4 py-2 rounded"
              >
                Download PDF
              </button>

            </div>

          </div>

          <div className="bg-white p-6 rounded-xl shadow">

            {isAIEnhanced && (
              <div className="text-green-600 text-sm mb-2">
                AI Enhanced
              </div>
            )}

            <div id="resume-preview" className="space-y-4">

              <h1 className="text-2xl font-bold">{formData.name}</h1>

              <p className="text-sm text-gray-600">
                {formData.email} | {formData.phone}
              </p>

              {formData.linkedin && (
                <p className="text-sm text-blue-600">{formData.linkedin}</p>
              )}

              <Section title="Summary" content={formData.summary} />
              <SectionList title="Skills" data={formatList(formData.skills)} />
              <SectionList title="Experience" data={formatList(formData.experience)} />
              <SectionList title="Projects" data={formatList(formData.projects)} />
              <SectionList title="Education" data={formatList(formData.education)} />
              <SectionList title="Certifications" data={formatList(formData.certifications)} />

            </div>
          </div>

        </div>
      </main>
    </div>
  );
}

function Section({ title, content }) {
  if (!content) return null;

  return (
    <div>
      <h3 className="font-semibold border-b pb-1">{title}</h3>
      <p className="text-sm mt-2">{content}</p>
    </div>
  );
}

function SectionList({ title, data }) {
  if (!data.length) return null;

  return (
    <div>
      <h3 className="font-semibold border-b pb-1">{title}</h3>
      <ul className="list-disc ml-5 text-sm mt-2 space-y-1">
        {data.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </div>
  );
}