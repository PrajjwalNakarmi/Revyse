import express from "express";

const router = express.Router();

router.get("/jobs", async (req, res) => {
  try {
    const response = await fetch("https://arbeitnow.com/api/job-board-api");
    const data = await response.json();

    res.json(data);

  } catch (error) {
    console.error("Job API error:", error);
    res.status(500).json({ message: "Failed to fetch jobs" });
  }
});

export default router;