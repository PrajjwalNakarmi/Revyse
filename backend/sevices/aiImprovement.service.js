import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function generateAIImprovements(resumeText) {
  if (!resumeText || resumeText.length < 100) {
    return ["Resume content is too short for AI analysis."];
  }

  const response = await client.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: "You are an ATS resume expert.",
      },
      {
        role: "user",
        content: `
Analyze the following resume and provide improvement suggestions
focused on ATS optimization, clarity, and structure.

Resume:
${resumeText}
        `,
      },
    ],
    temperature: 0.4,
  });

  const text = response.choices[0].message.content;

  return text
    .split("\n")
    .map(line => line.trim())
    .filter(line => line.length > 0);
}
