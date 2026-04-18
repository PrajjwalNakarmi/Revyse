export default function SoftwareTemplate({ data }) {
  return (
    <div className="p-8 text-sm text-slate-800 font-sans leading-relaxed">

      {/* HEADER */}
      <header className="border-b pb-3 mb-4">
        <h1 className="text-2xl font-bold text-slate-900">
          {data.name || "Your Name"}
        </h1>

        <p className="text-sm text-slate-600 mt-1">
          {[data.email, data.phone, data.linkedin]
            .filter(Boolean)
            .join(" | ")}
        </p>
      </header>

      {/* SUMMARY */}
      <Section title="Professional Summary">
        <p>{data.summary}</p>
      </Section>

      {/* SKILLS */}
      <Section title="Technical Skills">
        <div className="flex flex-wrap gap-2">
          {data.skills?.map((skill, i) => (
            <span
              key={i}
              className="bg-slate-100 px-2 py-1 rounded text-xs"
            >
              {skill}
            </span>
          ))}
        </div>
      </Section>

      {/* EXPERIENCE */}
      <Section title="Experience">
        {data.experience?.map((exp, i) => (
          <div key={i} className="mb-3">
            <ul className="list-disc ml-5">
              <li>{exp}</li>
            </ul>
          </div>
        ))}
      </Section>

      {/* PROJECTS */}
      <Section title="Projects">
        {data.projects?.map((proj, i) => (
          <div key={i} className="mb-3">
            <ul className="list-disc ml-5">
              <li>{proj}</li>
            </ul>
          </div>
        ))}
      </Section>

      {/* EDUCATION */}
      <Section title="Education">
        {data.education?.map((edu, i) => (
          <p key={i} className="mb-1">
            {edu}
          </p>
        ))}
      </Section>

    </div>
  );
}

/* SECTION COMPONENT */
const Section = ({ title, children }) =>
  children ? (
    <div className="mb-5">
      <h2 className="text-sm font-semibold text-slate-900 border-b pb-1 mb-2 uppercase tracking-wide">
        {title}
      </h2>
      {children}
    </div>
  ) : null;