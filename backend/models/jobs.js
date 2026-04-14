import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    job_title: {
      type: String,
      required: true,
    },

    company_name: {
      type: String,
      required: true,
    },

    job_description: {
      type: String,
      required: true,
    },

    location: {
      type: String,
      default: "Remote",
    },

    apply_link: {
      type: String,
    },

    skills: [
      {
        type: String,
      },
    ],

    match_score: {
      type: Number,
      default: 0,
    },

    source: {
      type: String, // e.g., "RemoteOK", "Arbeitnow", "Admin"
      default: "API",
    },

    is_active: {
      type: Boolean,
      default: true,
    },

    posted_date: {
      type: Date,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Job", jobSchema);