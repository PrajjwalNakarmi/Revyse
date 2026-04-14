import mongoose from "mongoose";

const jobSourceSchema = new mongoose.Schema({
  name: String,
  api_url: String,
  active: {
    type: Boolean,
    default: true,
  },
});

export default mongoose.model("JobSource", jobSourceSchema);