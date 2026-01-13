import fetch from "node-fetch";

const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";

export async function generateAIImprovements(resumeText) {
  if (!resumeText || resumeText.length < 100) {
    return ["Resume text too short for AI analysis"];
  }

  const response = await fetch(GROQ_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${process.env.GROQ_API_KEY}`
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
      ],
      temperature: 0.4
    })
  });

  if (!response.ok) {
    throw new Error("Groq API failed");
  }

  const data = await response.json();

  return data.choices[0].message.content
    .split("\n")
    .map(line => line.replace(/^[-•]\s*/, "").trim())
    .filter(Boolean);
}
