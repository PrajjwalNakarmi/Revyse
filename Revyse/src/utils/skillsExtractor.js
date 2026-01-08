const SKILL_KEYWORDS = [
  // Programming Languages
  "javascript",
  "python",
  "java",
  "c",
  "c++",
  "c#",
  "php",
  "typescript",

  // Frontend
  "html",
  "css",
  "react",
  "vue",
  "angular",
  "next.js",

  // Backend
  "node.js",
  "express",
  "django",
  "flask",
  "spring",
  "laravel",

  // Databases
  "mongodb",
  "mysql",
  "postgresql",
  "sqlite",

  // DevOps / Tools
  "git",
  "github",
  "docker",
  "kubernetes",
  "aws",
  "azure",
  "firebase",

  // AI / Data
  "machine learning",
  "deep learning",
  "nlp",
  "data analysis",
  "tensorflow",
  "pytorch"
];

export function extractSkillsFromText(text) {
  if (!text) return [];

  const normalizedText = text.toLowerCase();
  const foundSkills = new Set();

  for (const skill of SKILL_KEYWORDS) {
    if (normalizedText.includes(skill)) {
      foundSkills.add(skill);
    }
  }

  return Array.from(foundSkills);
}
