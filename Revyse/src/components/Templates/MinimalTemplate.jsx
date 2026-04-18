export default function MinimalTemplate({ data }) {
  return (
    <div className="p-6 text-gray-800 max-w-3xl mx-auto bg-white">

      {/* HEADER */}
      <h1 className="text-xl font-semibold break-words">
        {(data.name || "Your Name").replace(/_/g, " ")}
      </h1>

      <p className="text-sm text-gray-500 mb-4">
        {[data.email, data.phone].filter(Boolean).join(" • ")}
      </p>

      <Divider />

      {/* SUMMARY */}
      <Section title="Summary">
        <p className="text-sm text-gray-600">
          {data.summary || "Add a short summary."}
        </p>
      </Section>

      {/* SKILLS */}
      <Section title="Skills">
        <SimpleList items={data.skills} />
      </Section>

      {/* EXPERIENCE */}
      <Section title="Experience">
        <BulletList items={data.experience} />
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
  <div className="border-t border-gray-200 my-4" />
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