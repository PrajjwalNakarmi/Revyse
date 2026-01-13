const REQUIRED_SECTIONS = [
  "experience",
  "education",
  "skills",
  "projects",
];

const SKILLS = [
  "javascript",
  "python",
  "java",
  "react",
  "node",
  "sql",
  "html",
  "css",
  "git",
  "github",
];

export function calculateATSScore(text) {
  if (!text) return 0;

  const lower = text.toLowerCase();
  let score = 0;

  let sectionHits = 0;
  REQUIRED_SECTIONS.forEach((s) => {
    if (lower.includes(s)) sectionHits++;
  });

  score += (sectionHits / REQUIRED_SECTIONS.length) * 50;

  let skillHits = 0;
  SKILLS.forEach((skill) => {
    if (lower.includes(skill)) skillHits++;
  });

  score += Math.min((skillHits / SKILLS.length) * 50, 50);

  return Math.round(score);
}
