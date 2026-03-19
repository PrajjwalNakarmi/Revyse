import express from "express";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    let jobs = [];

    // ---------- SOURCE 1: RemoteOK ----------
    try {
      const remoteRes = await fetch("https://remoteok.com/api");

      if (remoteRes.ok) {
        const remoteData = await remoteRes.json();

        const remoteJobs = remoteData.slice(1, 20).map((job) => ({
          title: job.position,
          company: job.company,
          location: "Remote",
          description: job.description || "",
          url: job.url,
        }));

        jobs = [...jobs, ...remoteJobs];
      }
    } catch (err) {
      console.error("RemoteOK failed");
    }

    // ---------- SOURCE 2: Arbeitnow ----------
    try {
      const arbeitRes = await fetch("https://arbeitnow.com/api/job-board-api");

      if (arbeitRes.ok) {
        const arbeitData = await arbeitRes.json();

        const arbeitJobs = arbeitData.data.map((job) => ({
          title: job.title,
          company: job.company_name,
          location: job.location || "Remote",
          description: job.description || "",
          url: job.url,
        }));

        jobs = [...jobs, ...arbeitJobs];
      }
    } catch (err) {
      console.error("Arbeitnow failed");
    }

    // ---------- FINAL RESPONSE ----------
    if (!jobs.length) {
      return res.json({ jobs: [] });
    }

    res.json({ jobs });

  } catch (error) {
    console.error("Job API error:", error);
    res.status(500).json({ jobs: [] });
  }
});

export default router;