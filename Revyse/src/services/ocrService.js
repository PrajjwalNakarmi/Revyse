const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";
const API_URL = `${API_BASE_URL}/api/ocr/upload`;

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

      extractedText,

      atsScore: data.atsScore ?? 0,
      method: data.method || (file.type.startsWith("image/") ? "image-ocr" : "pdf"),

      skills: data.skills || [],
      aiImprovements: data.aiImprovements || [],

      isWeakExtraction,
    };

  } catch (error) {
    console.error("OCR Service Error:", error.message);
    if (error instanceof TypeError) {
      throw new Error("Cannot connect to OCR server. Start backend on port 5000 and try again.");
    }
    throw error;
  }
}