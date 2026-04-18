import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import AppFooter from "../components/AppFooter";
import html2pdf from "html2pdf.js";
import TemplateSelector from "../components/TemplateSelector";
import TemplateRenderer from "../components/TemplateRender";

export default function ResumeBuilder() {
  const [resumeData, setResumeData] = useState(null);
  const [isAIEnhanced, setIsAIEnhanced] = useState(false);
  const [isLoadingAI, setIsLoadingAI] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState("original");

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
    <div className="min-h-screen flex flex-col bg-[#f5f4ef] text-slate-900">
      <Navbar />

      <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col px-4 py-8 sm:px-6 lg:px-8">
        <section className="relative overflow-hidden rounded-[2rem] border border-[#1f5d66]/20 bg-gradient-to-r from-[#0f2a34] via-[#15424b] to-[#1f5d66] px-6 py-8 text-white shadow-[0_24px_80px_-40px_rgba(15,42,52,0.65)] sm:px-8 sm:py-10">
          <div className="pointer-events-none absolute -right-8 -top-10 h-40 w-40 rounded-full bg-[#ffd4a8]/20 blur-2xl" />
          <div className="pointer-events-none absolute -bottom-10 left-10 h-32 w-32 rounded-full bg-[#5ad1db]/20 blur-2xl" />

          <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-[#ffd4a8]">
            <span className="inline-flex h-2 w-2 rounded-full bg-[#f28f3b]" />
            Revyse Studio
          </p>

          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h1 className="text-3xl font-semibold leading-tight sm:text-4xl">Design a standout resume</h1>
              <p className="mt-3 max-w-2xl text-sm text-slate-200 sm:text-base">
                Edit your extracted profile, use AI to strengthen impact statements, and download a recruiter-ready PDF.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <MetricPill label="Skills" value={formatList(formData.skills).length} />
              <MetricPill label="Projects" value={formatList(formData.projects).length} />
              <MetricPill label="ATS" value={resumeData?.atsScore ?? resumeData?.score ?? "--"} />
            </div>
          </div>
        </section>

        <TemplateSelector
          selected={selectedTemplate}
          onSelect={setSelectedTemplate}
        />

        <section className="mt-8 grid flex-1 gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="glass-card rounded-3xl border border-[#1f5d66]/10 p-5 sm:p-6">
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-xl font-semibold text-slate-900">Builder Inputs</h2>
                <p className="mt-1 text-sm text-slate-600">Tune each section before exporting your final version.</p>
              </div>

              {isAIEnhanced && (
                <span className="inline-flex items-center rounded-full border border-[#1e6d4a]/20 bg-[#dff4ea] px-3 py-1 text-xs font-semibold text-[#1e6d4a]">
                  AI Enhanced
                </span>
              )}
            </div>

            <div className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <InputField
                  name="name"
                  label="Full Name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                />
                <InputField
                  name="email"
                  label="Email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                />
                <InputField
                  name="phone"
                  label="Phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+1 555 123 4567"
                />
                <InputField
                  name="linkedin"
                  label="LinkedIn"
                  value={formData.linkedin}
                  onChange={handleChange}
                  placeholder="linkedin.com/in/yourname"
                />
              </div>

              <TextareaField
                name="summary"
                label="Professional Summary"
                value={formData.summary}
                onChange={handleChange}
                rows="4"
                placeholder="Write a concise overview of your impact."
              />

              <div className="grid gap-4 lg:grid-cols-2">
                <TextareaField
                  name="skills"
                  label="Skills"
                  value={formData.skills}
                  onChange={handleChange}
                  rows="6"
                  placeholder="One skill per line"
                />
                <TextareaField
                  name="certifications"
                  label="Certifications"
                  value={formData.certifications}
                  onChange={handleChange}
                  rows="6"
                  placeholder="Relevant certificates and credentials"
                />
              </div>

              <TextareaField
                name="experience"
                label="Experience"
                value={formData.experience}
                onChange={handleChange}
                rows="6"
                placeholder="Highlight your professional experience"
              />

              <div className="grid gap-4 lg:grid-cols-2">
                <TextareaField
                  name="projects"
                  label="Projects"
                  value={formData.projects}
                  onChange={handleChange}
                  rows="5"
                  placeholder="Notable projects and outcomes"
                />
                <TextareaField
                  name="education"
                  label="Education"
                  value={formData.education}
                  onChange={handleChange}
                  rows="5"
                  placeholder="Degrees, institutions, and years"
                />
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-3 border-t border-[#1f5d66]/10 pt-5">
              <button
                onClick={generateAIImprovedContent}
                className="inline-flex items-center justify-center rounded-full bg-[#1f5d66] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#15424b]"
              >
                {isLoadingAI ? "Improving..." : "Enhance with AI"}
              </button>

              <button
                onClick={downloadPDF}
                className="inline-flex items-center justify-center rounded-full bg-[#f28f3b] px-5 py-2.5 text-sm font-semibold text-[#12242c] transition hover:bg-[#f4a45e]"
              >
                Download PDF
              </button>
            </div>
          </div>

          <aside className="glass-card rounded-3xl border border-[#1f5d66]/10 p-5 sm:p-6 lg:sticky lg:top-24 lg:max-h-[calc(100vh-8rem)] lg:overflow-auto">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-slate-900">Live Preview</h2>
                <p className="mt-1 text-sm text-slate-600">This is what your exported resume will look like.</p>
              </div>
            </div>

            <div
              id="resume-preview"
              className="rounded-2xl border border-[#1f5d66]/12 bg-white p-6 shadow-[0_12px_35px_-25px_rgba(15,42,52,0.5)]"
            >
              <TemplateRenderer
                template={selectedTemplate}
                data={{
                  ...formData,
                  skills: formatList(formData.skills),
                  experience: formatList(formData.experience),
                  projects: formatList(formData.projects),
                  education: formatList(formData.education),
                }}
                original={
                  <>
                    <header>
                      <h1 className="text-2xl font-bold text-slate-900">
                        {formData.name || "Your Name"}
                      </h1>
                      <p className="mt-1 text-sm text-slate-600">
                        {[formData.email, formData.phone].filter(Boolean).join(" | ") ||
                          "Email | Phone"}
                      </p>
                      {formData.linkedin && (
                        <p className="mt-1 text-sm text-[#1f5d66]">
                          {formData.linkedin}
                        </p>
                      )}
                    </header>

                    <Section title="Summary" content={formData.summary} />
                    <SectionList title="Skills" data={formatList(formData.skills)} />
                    <SectionList title="Experience" data={formatList(formData.experience)} />
                    <SectionList title="Projects" data={formatList(formData.projects)} />
                    <SectionList title="Education" data={formatList(formData.education)} />
                    <SectionList
                      title="Certifications"
                      data={formatList(formData.certifications)}
                    />
                  </>
                }
              />
            </div>
          </aside>
        </section>
      </main>

      <AppFooter className="mt-auto" />
    </div>
  );
}

function MetricPill({ label, value }) {
  return (
    <div className="inline-flex min-w-[90px] flex-col rounded-xl border border-white/20 bg-white/10 px-3 py-2 text-center">
      <span className="text-[10px] uppercase tracking-[0.12em] text-slate-200">{label}</span>
      <span className="mt-1 text-lg font-semibold text-white">{value}</span>
    </div>
  );
}

function InputField({ label, ...props }) {
  return (
    <label className="block text-sm">
      <span className="mb-2 block font-medium text-slate-700">{label}</span>
      <input
        {...props}
        className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-800 outline-none transition focus:border-[#1f5d66] focus:ring-2 focus:ring-[#1f5d66]/15"
      />
    </label>
  );
}

function TextareaField({ label, ...props }) {
  return (
    <label className="block text-sm">
      <span className="mb-2 block font-medium text-slate-700">{label}</span>
      <textarea
        {...props}
        className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-800 outline-none transition focus:border-[#1f5d66] focus:ring-2 focus:ring-[#1f5d66]/15"
      />
    </label>
  );
}

function Section({ title, content }) {
  if (!content) return null;

  return (
    <div>
      <h3 className="border-b border-[#1f5d66]/20 pb-1.5 text-sm font-semibold uppercase tracking-[0.1em] text-slate-700">{title}</h3>
      <p className="mt-2 whitespace-pre-line text-sm text-slate-700">{content}</p>
    </div>
  );
}

function SectionList({ title, data }) {
  if (!data.length) return null;

  return (
    <div>
      <h3 className="border-b border-[#1f5d66]/20 pb-1.5 text-sm font-semibold uppercase tracking-[0.1em] text-slate-700">{title}</h3>
      <ul className="ml-5 mt-2 list-disc space-y-1 text-sm text-slate-700">
        {data.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </div>
  );
}