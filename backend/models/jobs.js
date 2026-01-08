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
    posted_date: {
      type: Date,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Job", jobSchema);