import express from "express";

const router = express.Router();

router.get("/jobs", async (req, res) => {
  try {
    const response = await fetch("https://arbeitnow.com/api/job-board-api");

    // Check response status first
    if (!response.ok) {
      const errorText = await response.text();
      console.error("Job API HTTP error:", errorText);
      return res.status(500).json({ message: "Job API failed" });
    }

    // Read as text first (safe parsing)
    const text = await response.text();

    let data;

    try {
      data = JSON.parse(text);
    } catch (err) {
      console.error("Invalid JSON from Job API:", text.slice(0, 200));
      return res.status(500).json({ message: "Invalid job data received" });
    }

    res.json(data);

  } catch (error) {
    console.error("Job API error:", error);
    res.status(500).json({ message: "Failed to fetch jobs" });
  }
});

export default router;