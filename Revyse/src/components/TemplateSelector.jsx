const templates = [
  { id: "original", name: "Original (Default)" },
  { id: "software", name: "Software Developer" },
  { id: "designer", name: "UI/UX Designer" },
  { id: "data", name: "Data Analyst" },
  { id: "business", name: "Business/Marketing" },
  { id: "minimal", name: "Minimalist" }
];

export default function TemplateSelector({ selected, onSelect }) {
  return (
    <div className="mb-6">
      <h3 className="text-sm font-semibold text-slate-700 mb-3 mt-10">
        Choose Resume Template
      </h3>

      <div className="grid grid-cols-2 gap-3">
        {templates.map((t) => (
          <div
            key={t.id}
            onClick={() => onSelect(t.id)}
            className={`cursor-pointer rounded-xl border p-3 text-sm ${
              selected === t.id
                ? "border-[#1f5d66] bg-[#e6f2f4]"
                : "border-slate-200 bg-white"
            }`}
          >
            {t.name}
          </div>
        ))}
      </div>
    </div>
  );
}