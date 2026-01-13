export async function generateAIImprovements(resumeText) {
  try {
    const response = await fetch(process.env.GROQ_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`
      },
      body: JSON.stringify({
        model: "llama3-8b-8192",
        messages: [
          {
            role: "system",
            content: "You are an ATS resume expert."
          },
          {
            role: "user",
            content: `
Analyze this resume and suggest improvements.
Return bullet points only.

Resume:
${resumeText}
            `
          }
        ]
      })
    });

    if (!response.ok) {
      throw new Error(`Groq API error: ${response.status}`);
    }

    const data = await response.json();
    return data.choices?.[0]?.message?.content || [];

  } catch (err) {
    console.error("Groq AI failed:", err.message);

    // DOES NOT CRASH OCR FLOW
    return [
      "AI feedback is temporarily unavailable.",
      "Please try again later.",
      "OCR and ATS analysis completed successfully."
    ];
  }
}
