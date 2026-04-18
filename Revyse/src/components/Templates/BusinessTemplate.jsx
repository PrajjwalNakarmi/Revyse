export default function BusinessTemplate({ data }) {
  return (
    <div className="p-8 bg-white text-gray-800 font-serif max-w-4xl mx-auto">

      {/* HEADER */}
      <header className="mb-6">
        <h1 className="text-2xl font-bold break-words">
          {(data.name || "Your Name").replace(/_/g, " ")}
        </h1>
        <p className="text-sm text-gray-500">
          {[data.email, data.phone].filter(Boolean).join(" • ")}
        </p>
      </header>

      <Divider />

      {/* SUMMARY */}
      <Section title="Executive Summary">
        <p className="text-sm text-gray-600">
          {data.summary || "Add a brief executive summary."}
        </p>
      </Section>

      {/* SKILLS */}
      <Section title="Core Competencies">
        <TagList items={data.skills} />
      </Section>

      {/* EXPERIENCE */}
      <Section title="Professional Experience">
        <BulletList items={data.experience} />
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
    <div className="mb-6">
      <h2 className="text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
        {title}
      </h2>
      {children}
    </div>
  ) : null;

const Divider = () => (
  <div className="border-t border-gray-200 my-5" />
);

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

const TagList = ({ items }) =>
  items?.length ? (
    <div className="flex flex-wrap gap-2">
      {items.map((i, idx) => (
        <span
          key={idx}
          className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded border border-gray-200"
        >
          {i}
        </span>
      ))}
    </div>
  ) : null;