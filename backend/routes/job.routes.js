import express from "express";
import JobSource from "../models/jobSource.js";
import Parser from "rss-parser";

const router = express.Router();
const parser = new Parser();

router.get("/", async (req, res) => {
  try {
    let jobs = [];

    const sources = await JobSource.find();

    for (const source of sources) {
      try {

        // =========================
        // WEWORKREMOTELY (RSS)
        // =========================
        if (source.api_url.includes("weworkremotely")) {
          const feed = await parser.parseURL(source.api_url);

          const mapped = feed.items.map((item) => ({
            title: item.title,
            company: item.creator || "Unknown",
            location: "Remote",
            description: item.contentSnippet || "",
            url: item.link,
          }));

          jobs.push(...mapped);
          continue;
        }

        // =========================
        // NORMAL API CALL
        // =========================
        const response = await fetch(source.api_url);

        if (!response.ok) continue;

        const data = await response.json();

        // =========================
        // REMOTIVE
        // =========================
        if (data.jobs) {
          const mapped = data.jobs.map((job) => ({
            title: job.title,
            company: job.company_name,
            location: job.candidate_required_location || "Remote",
            description: job.description,
            url: job.url,
          }));

          jobs.push(...mapped);
        }

        // =========================
        // ARBEITNOW
        // =========================
        else if (data.data) {
          const mapped = data.data.map((job) => ({
            title: job.title,
            company: job.company_name,
            location: job.location || "Remote",
            description: job.description,
            url: job.url,
          }));

          jobs.push(...mapped);
        }

        // =========================
        // THE MUSE
        // =========================
        else if (data.results) {
          const mapped = data.results.map((job) => ({
            title: job.name,
            company: job.company?.name || "Unknown",
            location: job.locations?.[0]?.name || "Remote",
            description: job.contents,
            url: job.refs?.landing_page,
          }));

          jobs.push(...mapped);
        }

        // =========================
        // GENERIC FALLBACK
        // =========================
        else if (Array.isArray(data)) {
          const mapped = data.map((job) => ({
            title: job.title || job.position || "Unknown",
            company: job.company || "Unknown",
            location: job.location || "Remote",
            description: job.description || "",
            url: job.url || job.link || "",
          }));

          jobs.push(...mapped);
        }

      } catch (err) {
        console.log(`Failed source: ${source.name}`);
      }
    }

    res.json({ jobs });

  } catch (error) {
    console.error("Job fetch error:", error);
    res.status(500).json({ jobs: [] });
  }
});

export default router;