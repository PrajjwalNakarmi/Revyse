const API_URL = "http://localhost:5000/api/ocr/upload";

export async function uploadResumeForOCR(file) {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(API_URL, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "OCR request failed");
  }

  const data = await response.json();

  return {
    fileName: data.fileName,
    extractedText: data.extractedText,
    atsScore: data.atsScore ?? 0,
    method: data.method,
    // Forward skills and AI suggestions from backend to callers
    skills: data.skills || [],
    aiImprovements: data.aiImprovements || [],
  };
}
