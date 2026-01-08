import mongoose from "mongoose";

const cvSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    file_name: {
      type: String,
      required: true,
    },
    file_path: {
      type: String,
      required: true,
    },
    upload_date: {
      type: Date,
      default: Date.now,
    },
    extracted_text: {
      type: String,
    },
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
