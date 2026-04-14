export const searchJobsBySkills = async (skills) => {
  try {
    const res = await fetch("http://localhost:5000/api/jobs");

    const data = await res.json();

    const jobs = data.jobs || [];

    // Simple skill filtering
    const filteredJobs = jobs.map((job) => {
      const text = (
        job.title +
        " " +
        job.description +
        " " +
        (job.company || "")
      ).toLowerCase();

      let matchCount = 0;

      skills.forEach((skill) => {
        if (text.includes(skill.toLowerCase())) {
          matchCount++;
        }
      });

      const score = Math.round((matchCount / skills.length) * 100);

      return {
        ...job,
        match_score: score,
      };
    });

    return filteredJobs;

  } catch (error) {
    console.error("Job fetch failed", error);
    return [];
  }
};