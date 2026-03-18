import express from "express";
import { 
  generateAIImprovements,
  generateImprovedResume
} from "../services/aiImprovement.service.js";

const router = express.Router();


// EXISTING (analysis) — unchanged
router.post("/improve", async (req, res) => {
  try {
    const { text } = req.body;

    const result = await generateAIImprovements(text);

    res.json({ improvements: result });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "AI failed" });
  }
});


// NEW (resume builder AI)
router.post("/generate-resume", async (req, res) => {
  try {
    const { text } = req.body;

    const result = await generateImprovedResume(text);

    res.json({ content: result });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Resume AI failed" });
  }
});


export default router;