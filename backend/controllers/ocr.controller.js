import fs from "fs";
import path from "path";
import Tesseract from "tesseract.js";
import { createRequire } from "module";

import { calculateATSScore } from "../utils/atsScorer.js";
import { generateAIImprovements } from "../sevices/aiImprovement.service.js";

const require = createRequire(import.meta.url);
const pdfParse = require("pdf-parse");

export const extractText = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const filePath = req.file.path;
    const fileExt = path.extname(req.file.originalname).toLowerCase();

    let extractedText = "";
    let method = "";

    // Step 1: Try PDF text extraction
    if (fileExt === ".pdf") {
      try {
        const buffer = fs.readFileSync(filePath);
        const pdfData = await pdfParse(buffer);

        if (pdfData.text && pdfData.text.trim().length > 50) {
          extractedText = pdfData.text;
          method = "PDF Text Extraction";
        }
      } catch {
        console.warn("PDF text extraction failed, falling back to OCR");
      }
    }

    // Step 2: OCR fallback
    if (!extractedText) {
      const ocrResult = await Tesseract.recognize(filePath, "eng");
      extractedText = ocrResult.data.text;
      method = "OCR (Tesseract)";
    }

    // Step 3: ATS score
    const atsScore = calculateATSScore(extractedText);

    // Step 4: AI Improvements
    const aiImprovements = generateAIImprovements(extractedText);

    // Cleanup uploaded file
    fs.unlinkSync(filePath);

    return res.json({
      fileName: req.file.originalname,
      extractedText,
      atsScore,
      skills: [], // optional, can be filled later
      aiImprovements,
      method
    });

  } catch (error) {
    console.error("OCR ERROR:", error);
    return res.status(500).json({ message: "Resume analysis failed" });
  }
};
