import CV from "../models/CV.js";

export const saveCV = async (req, res) => {
  try {
    const {
      fileName,
      extractedText,
      atsScore,
      score,
      skills,
      aiImprovements,
    } = req.body;

    const cv = await CV.create({
      user_id: req.user._id,
      file_name: fileName,
      extracted_text: extractedText,
      ats_score: atsScore,
      score: score,
      skills: skills,
      ai_improvements: aiImprovements,
    });

    res.status(201).json(cv);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};