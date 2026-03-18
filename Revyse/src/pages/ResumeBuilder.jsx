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
    projects: ""
  });

  useEffect(() => {
    const storedResume = localStorage.getItem("selectedResume");

    if (storedResume) {
      const parsed = JSON.parse(storedResume);
      const text = parsed.extractedText || "";

      setResumeData(parsed);

      setFormData((prev) => ({
        ...prev,
        skills: parsed.skills?.join("\n") || "",
        summary: generateSummary(parsed.skills || []),

        experience:
          extractSection(text, ["experience", "work", "employment"]) ||
          text.split("\n").slice(0, 8).join("\n"),

        education:
          extractSection(text, ["education", "academic", "qualification"]),

        projects:
          extractSection(text, ["project", "projects"]),

        linkedin: extractLinkedIn(text)
      }));
    }
  }, []);

  const generateSummary = (skills) => {
    if (!skills || skills.length === 0) return "";

    return `Motivated and detail-oriented professional skilled in ${skills.join(
      ", "
    )}. Passionate about building scalable and efficient solutions.`;
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const applyAISuggestions = () => {
    if (!resumeData) return;

    const text = resumeData.extractedText || "";

    setFormData({
      name: resumeData.fileName?.replace(".pdf", "") || "",
      email: "",
      phone: "",
      linkedin: extractLinkedIn(text),
      summary: generateSummary(resumeData.skills || []),
      skills: resumeData.skills?.join("\n") || "",

      experience:
        extractSection(text, ["experience", "work", "employment"]) ||
        text.split("\n").slice(0, 8).join("\n"),

      education:
        extractSection(text, ["education", "academic", "qualification"]),

      projects:
        extractSection(text, ["project", "projects"])
    });

    setIsAIEnhanced(false);
  };

  // ----------- SMART EXTRACTION -----------

  const extractSection = (text, keywords) => {
    if (!text) return "";

    const lowerText = text.toLowerCase();

    for (let key of keywords) {
      const index = lowerText.indexOf(key);

      if (index !== -1) {
        const section = text.slice(index, index + 800);

        return section
          .replace(new RegExp(key, "i"), "")
          .trim();
      }
    }

    return "";
  };

  const extractLinkedIn = (text) => {
    const match = text.match(/https?:\/\/(www\.)?linkedin\.com\/[^\s]+/i);
    return match ? match[0] : "";
  };

  const cleanText = (text) => {
    return text
      ?.replace(/[-•*]\s*/g, "")
      ?.replace(/\*\*/g, "")
      ?.trim();
  };

  // ----------- EXPERIENCE CLEANER -----------

  const formatExperience = (text) => {
    if (!text) return [];

    return text
      .split("\n")
      .map((line) => line.trim())
      .filter((line) =>
        line &&
        line.length > 20 &&
        !line.toLowerCase().includes("gmail") &&
        !line.toLowerCase().includes("linkedin") &&
        !line.toLowerCase().includes("github") &&
        !line.match(/^\+?\d/) &&
        !line.toLowerCase().includes("profile") &&
        !line.toLowerCase().includes("curriculum vitae")
      );
  };

  // ----------- AI -----------

  const generateAIImprovedContent = async () => {
    if (!resumeData) return;

    setIsLoadingAI(true);

    try {
      const response = await fetch("http://localhost:5000/api/ai/generate-resume", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          text: resumeData.extractedText
        })
      });

      const data = await response.json();
      const output = data.content || "";

      if (!output.includes("SUMMARY")) return;

      const summary =
        cleanText(output.match(/SUMMARY:\s*([\s\S]*?)SKILLS:/)?.[1]) || "";

      const skills =
        cleanText(output.match(/SKILLS:\s*([\s\S]*?)EXPERIENCE:/)?.[1]) || "";

      const experience =
        cleanText(output.match(/EXPERIENCE:\s*([\s\S]*?)EDUCATION:/)?.[1]) || "";

      const education =
        cleanText(output.match(/EDUCATION:\s*([\s\S]*?)PROJECTS:/)?.[1]) || "";

      const projects =
        cleanText(output.match(/PROJECTS:\s*([\s\S]*)/)?.[1]) || "";

      setFormData((prev) => ({
        ...prev,
        summary: summary || prev.summary,
        skills: skills || prev.skills,
        experience: experience || prev.experience,
        education: education || prev.education,
        projects: projects || prev.projects
      }));

      setIsAIEnhanced(true);

    } catch (error) {
      console.error("AI enhancement failed", error);
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

        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          Resume Builder
        </h1>

        <div className="grid md:grid-cols-2 gap-8">

          {/* FORM */}
          <div className="bg-white p-6 rounded-xl shadow">

            <h2 className="font-semibold text-gray-700 mb-4">
              Edit Resume Details
            </h2>

            <div className="space-y-4">

              <input name="name" placeholder="Full Name" className="w-full border p-2 rounded" value={formData.name} onChange={handleChange} />
              <input name="email" placeholder="Email" className="w-full border p-2 rounded" value={formData.email} onChange={handleChange} />
              <input name="phone" placeholder="Phone" className="w-full border p-2 rounded" value={formData.phone} onChange={handleChange} />
              <input name="linkedin" placeholder="LinkedIn" className="w-full border p-2 rounded" value={formData.linkedin} onChange={handleChange} />

              <textarea name="summary" rows="3" className="w-full border p-2 rounded" value={formData.summary} onChange={handleChange} />
              <textarea name="skills" rows="3" className="w-full border p-2 rounded" value={formData.skills} onChange={handleChange} />
              <textarea name="experience" rows="4" className="w-full border p-2 rounded" value={formData.experience} onChange={handleChange} />
              <textarea name="projects" rows="3" className="w-full border p-2 rounded" value={formData.projects} onChange={handleChange} />
              <textarea name="education" rows="3" className="w-full border p-2 rounded" value={formData.education} onChange={handleChange} />

              <div className="flex gap-3 flex-wrap">

                <button onClick={applyAISuggestions} className="bg-gray-600 text-white px-4 py-2 rounded">
                  Reset
                </button>

                <button
                  onClick={generateAIImprovedContent}
                  className="bg-green-600 text-white px-4 py-2 rounded"
                >
                  {isLoadingAI ? "Improving..." : "Enhance with AI"}
                </button>

                <button onClick={downloadPDF} className="bg-indigo-600 text-white px-4 py-2 rounded">
                  Download PDF
                </button>

              </div>

            </div>
          </div>

          {/* PREVIEW */}
          <div className="bg-white p-6 rounded-xl shadow">

            <div id="resume-preview" className="p-6 border rounded space-y-4">

              <h1 className="text-2xl font-bold">{formData.name}</h1>

              <p className="text-sm text-gray-600">
                {formData.email} | {formData.phone}
              </p>

              {formData.linkedin && (
                <p className="text-sm text-blue-600">{formData.linkedin}</p>
              )}

              {formData.summary && (
                <div>
                  <h3 className="font-semibold border-b pb-1">Summary</h3>
                  <p className="text-sm mt-2">{formData.summary}</p>
                </div>
              )}

              {formData.skills && (
                <div>
                  <h3 className="font-semibold border-b pb-1">Skills</h3>
                  <ul className="list-disc ml-5 text-sm mt-2">
                    {formData.skills.split("\n").filter(Boolean).map((s, i) => (
                      <li key={i}>{s}</li>
                    ))}
                  </ul>
                </div>
              )}

              {formData.experience && (
                <div>
                  <h3 className="font-semibold border-b pb-1">Experience</h3>
                  <ul className="list-disc ml-5 text-sm mt-2">
                    {formatExperience(formData.experience).map((e, i) => (
                      <li key={i}>{e}</li>
                    ))}
                  </ul>
                </div>
              )}

              {formData.projects && (
                <div>
                  <h3 className="font-semibold border-b pb-1">Projects</h3>
                  <ul className="list-disc ml-5 text-sm mt-2">
                    {formData.projects.split("\n").filter(Boolean).map((p, i) => (
                      <li key={i}>{p}</li>
                    ))}
                  </ul>
                </div>
              )}

              {formData.education && (
                <div>
                  <h3 className="font-semibold border-b pb-1">Education</h3>
                  <ul className="list-disc ml-5 text-sm mt-2">
                    {formData.education.split("\n").filter(Boolean).map((e, i) => (
                      <li key={i}>{e}</li>
                    ))}
                  </ul>
                </div>
              )}

            </div>
          </div>

        </div>
      </main>
    </div>
  );
}