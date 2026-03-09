import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import html2pdf from "html2pdf.js";

export default function ResumeBuilder() {
  const [resumeData, setResumeData] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    summary: "",
    skills: "",
    experience: "",
    education: ""
  });

  useEffect(() => {
    const storedResume = localStorage.getItem("selectedResume");

    if (storedResume) {
      const parsed = JSON.parse(storedResume);

      setResumeData(parsed);

      setFormData((prev) => ({
        ...prev,
        skills: parsed.skills?.join(", ") || "",
        summary: generateSummary(parsed.skills || [])
      }));
    }
  }, []);

  const generateSummary = (skills) => {
    if (!skills || skills.length === 0) return "";

    return `Motivated and detail-oriented professional skilled in ${skills.join(
      ", "
    )}. Passionate about building scalable and efficient software solutions and continuously improving technical expertise.`;
  };

  const applyAISuggestions = () => {
    if (!resumeData) return;

    setFormData({
      name: resumeData.fileName?.replace(".pdf", "") || "",
      email: "",
      phone: "",
      summary: generateSummary(resumeData.skills || []),
      skills: resumeData.skills?.join(", ") || "",
      experience: "",
      education: ""
    });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const downloadPDF = () => {
    const element = document.getElementById("resume-preview");

    const options = {
      margin: 0.5,
      filename: "Improved_Resume.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" }
    };

    html2pdf().set(options).from(element).save();
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 py-10">

        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          Resume Builder
        </h1>

        <div className="grid md:grid-cols-2 gap-8">

          {/* FORM SECTION */}

          <div className="bg-white p-6 rounded-xl shadow">

            <h2 className="font-semibold text-gray-700 mb-4">
              Edit Resume Details
            </h2>

            <div className="space-y-4">

              <input
                type="text"
                name="name"
                placeholder="Full Name"
                className="w-full border p-2 rounded"
                value={formData.name}
                onChange={handleChange}
              />

              <input
                type="email"
                name="email"
                placeholder="Email"
                className="w-full border p-2 rounded"
                value={formData.email}
                onChange={handleChange}
              />

              <input
                type="text"
                name="phone"
                placeholder="Phone"
                className="w-full border p-2 rounded"
                value={formData.phone}
                onChange={handleChange}
              />

              <textarea
                name="summary"
                placeholder="Professional Summary"
                rows="3"
                className="w-full border p-2 rounded"
                value={formData.summary}
                onChange={handleChange}
              />

              <textarea
                name="skills"
                placeholder="Skills (comma separated)"
                rows="3"
                className="w-full border p-2 rounded"
                value={formData.skills}
                onChange={handleChange}
              />

              <textarea
                name="experience"
                placeholder="Experience (each line becomes a bullet)"
                rows="4"
                className="w-full border p-2 rounded"
                value={formData.experience}
                onChange={handleChange}
              />

              <textarea
                name="education"
                placeholder="Education"
                rows="3"
                className="w-full border p-2 rounded"
                value={formData.education}
                onChange={handleChange}
              />

              <div className="flex gap-3">

                <button
                  onClick={applyAISuggestions}
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                  Apply AI Improvements
                </button>

                <button
                  onClick={downloadPDF}
                  className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
                >
                  Download PDF
                </button>

              </div>

            </div>
          </div>


          {/* RESUME PREVIEW */}

          <div className="bg-white p-6 rounded-xl shadow">

            <h2 className="font-semibold text-gray-700 mb-4">
              Resume Preview
            </h2>

            <div
              id="resume-preview"
              className="p-6 border rounded bg-white text-gray-800"
            >

              <h1 className="text-2xl font-bold">
                {formData.name}
              </h1>

              <p className="text-sm text-gray-600">
                {formData.email} | {formData.phone}
              </p>

              {formData.summary && (
                <>
                  <h3 className="font-semibold mt-4">
                    Professional Summary
                  </h3>

                  <p className="text-sm">
                    {formData.summary}
                  </p>
                </>
              )}

              {formData.skills && (
                <>
                  <h3 className="font-semibold mt-4">
                    Skills
                  </h3>

                  <p className="text-sm">
                    {formData.skills}
                  </p>
                </>
              )}

              {formData.experience && (
                <>
                  <h3 className="font-semibold mt-4">
                    Experience
                  </h3>

                  <ul className="list-disc ml-5 text-sm">
                    {formData.experience
                      .split("\n")
                      .map((exp, i) => (
                        <li key={i}>{exp}</li>
                      ))}
                  </ul>
                </>
              )}

              {formData.education && (
                <>
                  <h3 className="font-semibold mt-4">
                    Education
                  </h3>

                  <p className="text-sm">
                    {formData.education}
                  </p>
                </>
              )}

            </div>
          </div>

        </div>
      </main>
    </div>
  );
}