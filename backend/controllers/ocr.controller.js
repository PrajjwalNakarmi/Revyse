import fs from "fs";
import path from "path";
import Tesseract from "tesseract.js";
import { createRequire } from "module";
import { calculateATSScore } from "../utils/atsScorer.js";
import { generateAIImprovements } from "../services/aiImprovement.service.js";

const require = createRequire(import.meta.url);
const pdfParse = require("pdf-parse");

export const extractText = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const filePath = req.file.path;
    const ext = path.extname(req.file.originalname).toLowerCase();

    let extractedText = "";
    let method = "";

    if (ext === ".pdf") {
      try {
        const buffer = fs.readFileSync(filePath);
        const pdf = await pdfParse(buffer);

        if (pdf.text && pdf.text.trim().length > 50) {
          extractedText = pdf.text;
          method = "pdf-text";
        }
      } catch {
        method = "ocr-fallback";
      }
    }

    if (!extractedText) {
      const ocr = await Tesseract.recognize(filePath, "eng");
      extractedText = ocr.data.text;
      method = "ocr";
    }

    const atsScore = calculateATSScore(extractedText);
    const aiImprovements = await generateAIImprovements(extractedText);

    fs.unlinkSync(filePath);

    return res.json({
      fileName: req.file.originalname,
      extractedText,
      atsScore,
      score: atsScore,
      method,
      aiImprovements
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Resume analysis failed" });
  }
};
