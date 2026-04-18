export default function DesignerTemplate({ data }) {
  return (
    <div className="p-8 bg-white text-gray-800 font-sans max-w-4xl mx-auto shadow-sm">

      {/* HEADER */}
      <header className="mb-6">
        <h1 className="text-3xl font-semibold tracking-wide text-gray-900 break-words leading-tight">
            {data.name || "Your Name"}
        </h1>

        <p className="text-sm text-gray-500 mt-1">
          {[data.email, data.phone, data.linkedin]
            .filter(Boolean)
            .join(" • ")}
        </p>
      </header>

      <Divider />

      {/* SUMMARY */}
      <Section title="Profile">
        <p className="text-sm text-gray-600 leading-relaxed">
          {data.summary || "Add a short professional summary here."}
        </p>
      </Section>

      {/* SKILLS */}
      <Section title="Core Skills">
        <div className="flex flex-wrap gap-2">
          {data.skills?.map((skill, i) => (
            <span
              key={i}
              className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-md border border-gray-200"
            >
              {skill}
            </span>
          ))}
        </div>
      </Section>

      {/* PROJECTS */}
      <Section title="Projects">
        {data.projects?.map((proj, i) => (
          <div key={i} className="mb-4">
            <p className="font-medium text-gray-800">{proj}</p>
            <div className="w-8 h-[2px] bg-gray-300 mt-1 mb-2" />
          </div>
        ))}
      </Section>

      {/* EXPERIENCE */}
      <Section title="Experience">
        <ul className="space-y-2">
          {data.experience?.map((exp, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
              <span className="mt-[6px] w-1.5 h-1.5 bg-gray-400 rounded-full" />
              <span>{exp}</span>
            </li>
          ))}
        </ul>
      </Section>

      {/* EDUCATION */}
      {data.education?.length > 0 && (
        <Section title="Education">
          {data.education.map((edu, i) => (
            <p key={i} className="text-sm text-gray-600 mb-1">
              {edu}
            </p>
          ))}
        </Section>
      )}
    </div>
  );
}

/* SECTION COMPONENT */
const Section = ({ title, children }) =>
  children ? (
    <div className="mb-6">
      <h2 className="text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
        {title}
      </h2>
      {children}
    </div>
  ) : null;

/* DIVIDER */
const Divider = () => (
  <div className="border-t border-gray-200 my-5" />
);