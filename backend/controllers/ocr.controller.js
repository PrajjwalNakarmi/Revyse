import fs from "fs";
import path from "path";
import Tesseract from "tesseract.js";
import { pdfToImages } from "../utils/pdfToImages.js";
import { calculateATSScore } from "../utils/atsScorer.js";
import { generateAIImprovements } from "../services/aiImprovement.service.js";
import { extractSkillsFromText } from "../utils/skillsExtractor.js";
import CV from "../models/CV.js";

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
      const outputDir = `uploads/pdf_images_${Date.now()}`;
      await pdfToImages(filePath, outputDir);

      const images = fs.readdirSync(outputDir);
      for (const img of images) {
        const imgPath = path.join(outputDir, img);
        const ocr = await Tesseract.recognize(imgPath, "eng");
        extractedText += "\n" + ocr.data.text;
      }

      fs.rmSync(outputDir, { recursive: true, force: true });
      method = "pdf-to-image-ocr";
    }

    if ([".png", ".jpg", ".jpeg", ".webp"].includes(ext)) {
      const ocr = await Tesseract.recognize(filePath, "eng");
      extractedText = ocr.data.text;
      method = "image-ocr";
    }

    if (!extractedText || extractedText.trim().length < 50) {
      fs.unlinkSync(filePath);
      return res.status(400).json({ message: "Text extraction failed" });
    }

    /* ---------- ATS + SKILLS + AI ---------- */
    const atsScore = calculateATSScore(extractedText);
    const skills = extractSkillsFromText(extractedText);
    const aiImprovements = await generateAIImprovements(extractedText);

    // Save OCR result so admin CV feed can display near real-time uploads.
    try {
      await CV.create({
        user_id: req.user?._id,
        file_name: req.file.originalname,
        file_path: filePath,
        extracted_text: extractedText,
        summary: extractedText.slice(0, 280),
        analysis_date: new Date(),
      });
    } catch (saveErr) {
      console.error("CV save warning:", saveErr.message);
    }

    fs.unlinkSync(filePath);

    return res.json({
      fileName: req.file.originalname,
      extractedText,
      atsScore,
      score: atsScore,
      method,
      skills,            //  FIX
      aiImprovements     //  FIX
    });

  } catch (err) {
    console.error("OCR Error:", err);
    return res.status(500).json({ message: "Resume analysis failed" });
  }
};
