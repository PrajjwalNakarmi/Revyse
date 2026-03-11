import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.routes.js";
import ocrRoutes from "./routes/ocr.routes.js";
import jobRoutes from "./routes/job.routes.js";

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Revyse Backend Running");
});

app.listen(process.env.PORT || 5000, () => {
  console.log("Server running on port 5000");
});

app.use("/api/ocr", ocrRoutes);
console.log("GROQ_API_URL:", process.env.GROQ_API_URL);
console.log("GROQ_API_KEY exists:", !!process.env.GROQ_API_KEY);

app.use("/api", jobRoutes);

