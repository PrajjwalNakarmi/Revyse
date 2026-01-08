const API_URL = "http://localhost:5000/api/ocr";

export async function uploadResumeForOCR(file) {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch(`${API_URL}/upload`, {
    method: "POST",
    body: formData
  });

  if (!res.ok) {
    throw new Error("OCR failed");
  }

  return res.json();
}
