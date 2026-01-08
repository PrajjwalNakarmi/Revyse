import express from "express";
import multer from "multer";
import { uploadAndExtractOCR } from "../controllers/ocr.controller.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/upload", upload.single("file"), uploadAndExtractOCR);

export default router;
