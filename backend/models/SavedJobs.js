import mongoose from "mongoose";

const savedJobSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    job_id: String,

    title: String,
    company: String,
    description: String,
    apply_link: String,

    match_score: Number,

    skills: [String],
  },
  { timestamps: true }
);

export default mongoose.model("SavedJob", savedJobSchema);