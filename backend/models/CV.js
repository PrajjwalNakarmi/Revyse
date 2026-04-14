import mongoose from "mongoose";

const cvSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },

    file_name: {
      type: String,
      required: true,
    },

    file_path: {
      type: String,
      required: false,
    },

    upload_date: {
      type: Date,
      default: Date.now,
    },

    extracted_text: {
      type: String,
    },

    // ✅ ADDED (from frontend)
    ats_score: {
      type: Number,
      default: 0,
    },

    score: {
      type: Number,
      default: 0,
    },

    skills: [
      {
        type: String,
      },
    ],

    ai_improvements: [
      {
        type: String,
      },
    ],

    summary: {
      type: String,
    },

    analysis_date: {
      type: Date,
    },

    job_matches: [
      {
        job_id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Job",
        },
        score: Number,
      },
    ],

    generated_cvs: [
      {
        template_name: String,
        file_path: String,
        created_at: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("CV", cvSchema);