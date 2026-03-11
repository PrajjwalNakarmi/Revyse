export async function searchJobsBySkills(skills) {
  try {
    const response = await fetch("http://localhost:5000/api/jobs");

    if (!response.ok) {
      throw new Error("Failed to fetch jobs from backend");
    }

    const data = await response.json();

    if (!data.data) return [];

    const resumeSkills = skills.map((skill) =>
      skill.toLowerCase().trim()
    );

    const jobs = data.data.map((job) => {
      const description = job.description || "";

      const cleanDescription = description
        .replace(/<[^>]*>/g, "")
        .toLowerCase();

      const matchedSkills = resumeSkills.filter((skill) =>
        cleanDescription.includes(skill)
      );

      const matchScore =
        resumeSkills.length === 0
          ? 0
          : Math.round(
              (matchedSkills.length / resumeSkills.length) * 100
            );

      return {
        id: job.slug || Math.random().toString(),
        title: job.title || "Job Title",
        company: job.company_name || "Company",
        description:
          cleanDescription.slice(0, 200) + "...",
        applyLink: job.url || "#",
        skills: matchedSkills,
        matchScore
      };
    });

    return jobs
      .sort((a, b) => b.matchScore - a.matchScore)
      .slice(0, 12);

  } catch (error) {
    console.error("Job API error:", error);
    return [];
  }
}