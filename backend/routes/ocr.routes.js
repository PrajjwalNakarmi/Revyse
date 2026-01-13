import express from "express";
import multer from "multer";
import { extractText } from "../controllers/ocr.controller.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/upload", upload.single("file"), extractText);

export default router;
