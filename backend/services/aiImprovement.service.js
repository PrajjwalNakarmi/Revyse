export async function generateAIImprovements(resumeText) {
  try {
    const apiUrl = process.env.GROQ_API_URL;
    const apiKey = process.env.GROQ_API_KEY;

    if (!apiUrl || !apiKey) {
      throw new Error("Groq environment variables missing");
    }

    if (!resumeText || resumeText.trim().length < 50) {
      throw new Error("Resume text too short for AI analysis");
    }

    const MAX_CHARS = 6000;
    const safeText =
      resumeText.length > MAX_CHARS
        ? resumeText.slice(0, MAX_CHARS)
        : resumeText;

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant", // ✅ ACTIVE GROQ MODEL
        messages: [
          {
            role: "system",
            content: "You are an ATS resume expert.",
          },
          {
            role: "user",
            content:
              "Analyze the following resume and suggest improvements. " +
              "Return concise bullet points only.\n\n" +
              safeText,
          },
        ],
        temperature: 0.3,
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`Groq API error ${response.status}: ${errText}`);
    }

    const data = await response.json();
    const raw = data?.choices?.[0]?.message?.content || "";

    return raw
      .split("\n")
      .map((line) => line.replace(/^[-•*]\s*/, "").trim())
      .filter(Boolean);

  } catch (err) {
    console.error("Groq AI failed:", err.message);

    // ✅ Guaranteed non-empty AI output (important for frontend)
    return [
      "Add more role-specific keywords to improve ATS matching",
      "Quantify achievements using numbers and measurable impact",
      "Use clear section headings and consistent formatting",
      "Include a concise professional summary at the top",
    ];
  }
}
