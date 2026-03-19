export async function searchJobsBySkills(skills) {
  try {
    const response = await fetch("http://localhost:5000/api/jobs");

    if (!response.ok) {
      throw new Error("Failed to fetch jobs from backend");
    }

    const data = await response.json();

    //  FIX: support both formats (jobs OR data)
    const jobList = data.jobs || data.data || [];

    if (!jobList.length) return [];

    const resumeSkills = skills.map((skill) =>
      skill.toLowerCase().trim()
    );

    const jobs = jobList.map((job, index) => {
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
        id: job.slug || job.url || index,
        title: job.title || "Job Title",
        company: job.company_name || job.company || "Company",
        location: job.location || "Remote",
        description:
          cleanDescription.slice(0, 200) + "...",
        applyLink: job.url || "#",
        skills: matchedSkills,
        matchScore
      };
    });

    //  DO NOT remove jobs — just sort
    return jobs.sort((a, b) => b.matchScore - a.matchScore);

  } catch (error) {
    console.error("Job API error:", error);
    return [];
  }
}