import fs from "fs";
import path from "path";
import Tesseract from "tesseract.js";
import pdfPoppler from "pdf-poppler";
import { calculateATSScore } from "../utils/atsScorer.js";

export const extractText = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const filePath = req.file.path;
    const fileExt = path.extname(req.file.originalname).toLowerCase();

    let extractedText = "";
    let method = "";

    // Directory to store temp images
    const outputDir = path.join("uploads", `images-${Date.now()}`);
    fs.mkdirSync(outputDir, { recursive: true });

    // Convert PDF to images
    if (fileExt === ".pdf") {
      const options = {
        format: "png",
        out_dir: outputDir,
        out_prefix: "page",
        page: null
      };

      await pdfPoppler.convert(filePath, options);

      const imageFiles = fs
        .readdirSync(outputDir)
        .filter(file => file.endsWith(".png"));

      for (const img of imageFiles) {
        const imgPath = path.join(outputDir, img);
        const result = await Tesseract.recognize(imgPath, "eng");
        extractedText += result.data.text + "\n";
      }

      method = "PDF → Image → OCR";
    }

    if (!extractedText.trim()) {
      throw new Error("No text extracted");
    }

    const atsScore = calculateATSScore(extractedText);

    // Cleanup
    fs.unlinkSync(filePath);
    fs.rmSync(outputDir, { recursive: true, force: true });

    return res.json({
      fileName: req.file.originalname,
      extractedText,
      atsScore,
      method
    });

  } catch (error) {
    console.error("OCR ERROR:", error);
    return res.status(500).json({ message: "Resume analysis failed" });
  }
};
