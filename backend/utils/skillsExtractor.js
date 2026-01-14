const SKILL_KEYWORDS = [
  // Programming Languages
  { name: "javascript", variants: ["javascript", "js"] },
  { name: "python", variants: ["python"] },
  { name: "java", variants: ["java"] },
  { name: "c", variants: [" c "] },
  { name: "c++", variants: ["c++", "cpp"] },
  { name: "c#", variants: ["c#", "c sharp"] },
  { name: "php", variants: ["php"] },
  { name: "typescript", variants: ["typescript", "ts"] },

  // Frontend
  { name: "html", variants: ["html"] },
  { name: "css", variants: ["css"] },
  { name: "react", variants: ["react", "reactjs"] },
  { name: "vue", variants: ["vue", "vuejs"] },
  { name: "angular", variants: ["angular"] },
  { name: "next.js", variants: ["next.js", "next js", "nextjs"] },

  // Backend
  { name: "node.js", variants: ["node.js", "node js", "nodejs"] },
  { name: "express", variants: ["express", "expressjs"] },
  { name: "django", variants: ["django"] },
  { name: "flask", variants: ["flask"] },
  { name: "spring", variants: ["spring", "spring boot"] },
  { name: "laravel", variants: ["laravel"] },

  // Databases
  { name: "mongodb", variants: ["mongodb", "mongo db"] },
  { name: "mysql", variants: ["mysql"] },
  { name: "postgresql", variants: ["postgresql", "postgres"] },
  { name: "sqlite", variants: ["sqlite"] },

  // DevOps / Tools
  { name: "git", variants: ["git"] },
  { name: "github", variants: ["github"] },
  { name: "docker", variants: ["docker"] },
  { name: "kubernetes", variants: ["kubernetes", "k8s"] },
  { name: "aws", variants: ["aws", "amazon web services"] },
  { name: "azure", variants: ["azure"] },
  { name: "firebase", variants: ["firebase"] },

  // AI / Data
  { name: "machine learning", variants: ["machine learning", "ml"] },
  { name: "deep learning", variants: ["deep learning", "dl"] },
  { name: "nlp", variants: ["nlp", "natural language processing"] },
  { name: "data analysis", variants: ["data analysis", "data analytics"] },
  { name: "tensorflow", variants: ["tensorflow"] },
  { name: "pytorch", variants: ["pytorch"] },
];

export function extractSkillsFromText(text) {
  if (!text) return [];

  // Normalize OCR text heavily
  const normalizedText = text
    .toLowerCase()
    .replace(/[\n\r]/g, " ")
    .replace(/\s+/g, " ");

  const foundSkills = new Set();

  for (const skill of SKILL_KEYWORDS) {
    for (const variant of skill.variants) {
      if (normalizedText.includes(variant)) {
        foundSkills.add(skill.name);
        break;
      }
    }
  }

  return Array.from(foundSkills);
}
