export default function DataAnalystTemplate({ data }) {
  return (
    <div className="p-8 bg-white text-gray-800 font-sans max-w-4xl mx-auto">

      {/* HEADER */}
      <header className="mb-5">
        <h1 className="text-2xl font-semibold break-words">
          {(data.name || "Your Name").replace(/_/g, " ")}
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
          {data.summary || "Add a professional summary here."}
        </p>
      </Section>

      {/* SKILLS */}
      <Section title="Technical Skills">
        <SkillRow label="Skills" items={data.skills} />
      </Section>

      {/* EXPERIENCE */}
      <Section title="Experience">
        <BulletList items={data.experience} />
      </Section>

      {/* PROJECTS */}
      <Section title="Projects">
        <BulletList items={data.projects} />
      </Section>

      {/* EDUCATION */}
      <Section title="Education">
        <SimpleList items={data.education} />
      </Section>

    </div>
  );
}

/* ---------- HELPERS ---------- */

const Section = ({ title, children }) =>
  children ? (
    <div className="mb-5">
      <h2 className="text-xs font-semibold text-gray-700 uppercase mb-2">
        {title}
      </h2>
      {children}
    </div>
  ) : null;

const BulletList = ({ items }) =>
  items?.length ? (
    <ul className="list-disc ml-5 text-sm text-gray-600 space-y-1">
      {items.map((i, idx) => (
        <li key={idx}>{i}</li>
      ))}
    </ul>
  ) : null;

const SimpleList = ({ items }) =>
  items?.length ? (
    items.map((i, idx) => (
      <p key={idx} className="text-sm text-gray-600">
        {i}
      </p>
    ))
  ) : null;

const SkillRow = ({ label, items }) => (
  <p className="text-sm text-gray-600">
    <span className="font-medium text-gray-700">{label}:</span>{" "}
    {items?.join(", ")}
  </p>
);

const Divider = () => (
  <div className="border-t border-gray-200 my-4"></div>
);