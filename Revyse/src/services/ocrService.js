const API_URL = "http://localhost:5000/api/ocr/upload";

export async function uploadResumeForOCR(file) {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch(API_URL, {
      method: "POST",
      body: formData,
    });

    // Handle server errors safely
    if (!response.ok) {
      let errorMessage = "OCR request failed";

      try {
        const errData = await response.json();
        errorMessage = errData.message || errorMessage;
      } catch {
        const text = await response.text();
        errorMessage = text || errorMessage;
      }

      throw new Error(errorMessage);
    }

    const data = await response.json();

    // Normalize extracted text
    const extractedText = data.extractedText?.trim() || "";

    // Do NOT fully block if OCR is weak (important for images)
    const isWeakExtraction = extractedText.length < 20;

    if (isWeakExtraction) {
      console.warn("Weak OCR result detected");
    }

    return {
      fileName: data.fileName || file.name,

      // fallback so app never crashes
      extractedText:
        extractedText ||
        "Text extraction was limited. Try uploading a clearer image or PDF.",

      atsScore: data.atsScore ?? 0,
      method: data.method || (file.type.startsWith("image/") ? "image-ocr" : "pdf"),

      skills: data.skills || [],
      aiImprovements: data.aiImprovements || [],

      // extra flag (useful if you want UI warning later)
      isWeakExtraction,
    };

  } catch (error) {
    console.error("OCR Service Error:", error.message);

    // return fallback instead of breaking app
    return {
      fileName: file.name,
      extractedText:
        "Failed to extract text from the file. Please try a clearer resume.",
      atsScore: 0,
      method: "error",
      skills: [],
      aiImprovements: [],
      isWeakExtraction: true,
    };
  }
}