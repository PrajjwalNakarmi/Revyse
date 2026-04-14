import fs from "fs";
import path from "path";
import pdfPoppler from "pdf-poppler";

export const pdfToImages = async (pdfPath, outputDir) => {
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const options = {
    format: "png",
    out_dir: outputDir,
    out_prefix: "page",
    page: null,           // convert all pages
    density: 300          // FIXED (was dpi)
  };

  await pdfPoppler.convert(pdfPath, options);
};