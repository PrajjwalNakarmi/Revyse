const REQUIRED_SKILLS = [
  "javascript",
  "react",
  "node",
  "mongodb",
  "html",
  "css",
];

const EXPERIENCE_KEYWORDS = [
  "experience",
  "worked",
  "developed",
  "project",
  "intern",
  "company",
];

const EDUCATION_KEYWORDS = [
  "bachelor",
  "master",
  "degree",
  "university",
  "college",
];

const SECTIONS = [
  "experience",
  "education",
  "skills",
  "projects",
];

export function calculateATSScore(resumeText, skills = []) {
  let score = 0;

  // 1. Resume length (20 points)
  if (resumeText.length > 1500) score += 20;
  else if (resumeText.length > 800) score += 10;

  // 2. Skills presence (40 points)
  const skillScore = Math.min(skills.length * 5, 40);
  score += skillScore;

  // 3. Section keywords (40 points)
  const sections = [
    "experience",
    "education",
    "skills",
    "projects",
    "certifications"
  ];

  let sectionCount = 0;
  sections.forEach(section => {
    if (resumeText.toLowerCase().includes(section)) {
      sectionCount++;
    }
  });

  score += sectionCount * 8;

  return Math.min(score, 100);
}

