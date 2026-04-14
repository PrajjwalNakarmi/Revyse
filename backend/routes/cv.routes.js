import express from "express";
import { saveCV } from "../controllers/cv.controller.js";
import protect from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/upload", protect, saveCV);

export default router;