import fs from "fs";
import path from "path";
import Tesseract from "tesseract.js";
import sharp from "sharp";
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

    /* =========================
       PDF OCR
    ========================= */
    if (ext === ".pdf") {
      const outputDir = `uploads/pdf_images_${Date.now()}`;
      await pdfToImages(filePath, outputDir);

      const images = fs.readdirSync(outputDir);

      for (const img of images) {
        const imgPath = path.join(outputDir, img);

        const {
          data: { text },
        } = await Tesseract.recognize(imgPath, "eng", {
          tessedit_pageseg_mode: 6,
        });

        extractedText += "\n" + text;
      }

      fs.rmSync(outputDir, { recursive: true, force: true });
      method = "pdf-to-image-ocr";
    }

    /* =========================
       IMAGE OCR (ENHANCED)
    ========================= */
    else if ([".png", ".jpg", ".jpeg", ".webp"].includes(ext)) {
      const processedPath = `uploads/processed_${Date.now()}.png`;

      await sharp(filePath)
        .resize({ width: 1600 })
        .grayscale()
        .normalize()
        .sharpen()
        .threshold(150)
        .toFile(processedPath);

      const {
        data: { text },
      } = await Tesseract.recognize(processedPath, "eng", {
        tessedit_pageseg_mode: 6,
      });

      extractedText = text;
      method = "image-ocr-enhanced";

      fs.unlinkSync(processedPath);
    }

    else {
      fs.unlinkSync(filePath);
      return res.status(400).json({ message: "Unsupported file type" });
    }

    /* =========================
       CLEAN TEXT (IMPROVED)
    ========================= */
    const cleanText = (text) => {
      return text
        .replace(/[|]/g, "I")
        .replace(/0/g, "o")
        .replace(/1/g, "l")
        .replace(/5/g, "s")
        .replace(/[^a-zA-Z0-9@.\n\s]/g, " ")
        .replace(/\b[a-zA-Z]{1,2}\b/g, "")
        .replace(/\s+/g, " ")
        .trim();
    };

    extractedText = cleanText(extractedText);

    /* =========================
       LOW QUALITY OCR DETECTION
    ========================= */
    if (extractedText.split(" ").length < 30) {
      fs.unlinkSync(filePath);

      return res.json({
        fileName: req.file.originalname,
        extractedText,
        atsScore: 30,
        score: 30,
        method,
        skills: [],
        aiImprovements: [
          "Upload a PDF version of your resume for better accuracy",
          "Use a clean black-and-white resume format",
          "Avoid images or stylized fonts in your CV",
        ],
        warning: "Poor OCR quality detected",
      });
    }

    /* =========================
       VALIDATION
    ========================= */
    if (!extractedText || extractedText.length < 20) {
      fs.unlinkSync(filePath);
      return res.status(400).json({
        message: "Low quality text detected. Try a clearer image or PDF.",
      });
    }

    /* =========================
       ANALYSIS
    ========================= */
    const atsScore =
      extractedText.length > 100
        ? calculateATSScore(extractedText)
        : 30;

    const skills = extractSkillsFromText(extractedText.toLowerCase());

    const aiImprovements = await generateAIImprovements(extractedText);

    /* =========================
       SAVE TO DB
    ========================= */
    try {
      await CV.create({
        user_id: req.user?._id,
        file_name: req.file.originalname,
        file_path: filePath,
        extracted_text: extractedText,
        summary: extractedText.slice(0, 280),
        analysis_date: new Date(),
      });
    } catch (err) {
      console.error("CV save warning:", err.message);
    }

    fs.unlinkSync(filePath);

    return res.json({
      fileName: req.file.originalname,
      extractedText,
      atsScore,
      score: atsScore,
      method,
      skills,
      aiImprovements,
    });

  } catch (err) {
    console.error("OCR Error:", err);
    return res.status(500).json({ message: "Resume analysis failed" });
  }
};