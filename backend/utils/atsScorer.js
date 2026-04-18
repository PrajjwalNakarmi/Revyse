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

const ACTION_WORDS = [
  "developed",
  "built",
  "designed",
  "implemented",
  "created",
  "managed",
  "led",
  "improved",
  "optimized",
];

export function calculateATSScore(text) {
  if (!text) return 0;

  const lower = text.toLowerCase();
  let score = 0;

  /* =========================
     1. SECTION SCORE (30)
  ========================= */
  let sectionHits = 0;
  REQUIRED_SECTIONS.forEach((section) => {
    if (lower.includes(section)) sectionHits++;
  });

  const sectionScore = (sectionHits / REQUIRED_SECTIONS.length) * 30;
  score += sectionScore;

  /* =========================
     2. SKILL MATCH SCORE (25)
  ========================= */
  let skillHits = 0;
  SKILLS.forEach((skill) => {
    if (lower.includes(skill)) skillHits++;
  });

  const skillScore = (skillHits / SKILLS.length) * 25;
  score += skillScore;

  /* =========================
     3. KEYWORD DENSITY (15)
  ========================= */
  let keywordCount = 0;
  SKILLS.forEach((skill) => {
    const matches = lower.split(skill).length - 1;
    keywordCount += matches;
  });

  const densityScore = Math.min(keywordCount * 2, 15);
  score += densityScore;

  /* =========================
     4. EXPERIENCE SIGNALS (15)
  ========================= */
  let actionHits = 0;
  ACTION_WORDS.forEach((word) => {
    if (lower.includes(word)) actionHits++;
  });

  const experienceScore = Math.min(actionHits * 2, 15);
  score += experienceScore;

  /* =========================
     5. LENGTH & CONTENT (15)
  ========================= */
  const wordCount = lower.split(/\s+/).length;

  let lengthScore = 0;
  if (wordCount > 300) lengthScore = 15;
  else if (wordCount > 150) lengthScore = 10;
  else if (wordCount > 80) lengthScore = 5;

  score += lengthScore;

  /* =========================
     FINAL SCORE
  ========================= */
  return Math.min(Math.round(score), 100);
}