import fs from "fs";
import path from "path";
import Tesseract from "tesseract.js";
import { createRequire } from "module";
import { calculateATSScore } from "../utils/atsScorer.js";

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

    // STEP 1: PDF text extraction
    if (fileExt === ".pdf") {
      try {
        const buffer = fs.readFileSync(filePath);
        const pdfData = await pdfParse(buffer);

        if (pdfData.text && pdfData.text.trim().length > 50) {
          extractedText = pdfData.text;
          method = "PDF Text Extraction";
        } else {
          method = "PDF (No readable text)";
        }
      } catch (err) {
        method = "PDF Parse Failed";
      }
    }

    // STEP 2: OCR only for images
    if (!extractedText && fileExt !== ".pdf") {
      const ocrResult = await Tesseract.recognize(filePath, "eng");
      extractedText = ocrResult.data.text;
      method = "OCR (Tesseract)";
    }

    // If still no text
    if (!extractedText) {
      extractedText = "No readable text found in document.";
    }

    // STEP 3: ATS Score
    const atsScore = calculateATSScore(extractedText);

    fs.unlinkSync(filePath);

    return res.json({
      fileName: req.file.originalname,
      extractedText,
      atsScore,
      method,
    });
  } catch (error) {
    console.error("OCR ERROR:", error);
    return res.status(500).json({ message: "OCR failed" });
  }
};
