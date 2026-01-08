import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { exec } from "child_process";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs";
import Tesseract from "tesseract.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Extract text from PDF using pdfjs-dist
 */
async function extractTextFromPDF(pdfPath) {
  const data = new Uint8Array(fs.readFileSync(pdfPath));
  const pdf = await pdfjsLib.getDocument({ data }).promise;

  let text = "";

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    const strings = content.items.map(item => item.str);
    text += strings.join(" ") + "\n";
  }

  return text.trim();
}

/**
 * Convert PDF to images using Poppler (pdftoppm)
 */
function convertPdfToImages(pdfPath, outputDir) {
  return new Promise((resolve, reject) => {
    const outputPrefix = path.join(outputDir, "page");
    const command = `pdftoppm -png "${pdfPath}" "${outputPrefix}"`;

    exec(command, (error) => {
      if (error) return reject(error);

      const images = fs
        .readdirSync(outputDir)
        .filter(file => file.endsWith(".png"))
        .map(file => path.join(outputDir, file));

      resolve(images);
    });
  });
}

/**
 * OCR images using Tesseract
 */
async function ocrImages(imagePaths) {
  let text = "";

  for (const image of imagePaths) {
    const result = await Tesseract.recognize(image, "eng");
    text += result.data.text + "\n";
  }

  return text.trim();
}

/**
 * Main Controller
 */
export async function uploadAndExtractOCR(req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const pdfPath = req.file.path;
    console.log("File received:", req.file.originalname);

    // STEP 1: Try extracting text directly
    const extractedText = await extractTextFromPDF(pdfPath);

    if (extractedText.length > 100) {
      return res.json({
        method: "pdf-text",
        text: extractedText
      });
    }

    // STEP 2: Fallback to OCR
    const outputDir = path.join(__dirname, "../temp", Date.now().toString());
    fs.mkdirSync(outputDir, { recursive: true });

    const images = await convertPdfToImages(pdfPath, outputDir);
    const ocrText = await ocrImages(images);

    // Cleanup temp images
    fs.rmSync(outputDir, { recursive: true, force: true });

    if (!ocrText) {
      return res.status(500).json({ message: "OCR failed" });
    }

    return res.json({
      method: "ocr",
      text: ocrText
    });

  } catch (error) {
    console.error("OCR ERROR:", error);
    return res.status(500).json({ message: "OCR failed" });
  }
}
