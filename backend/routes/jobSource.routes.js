import express from "express";
import {
  getSources,
  addSource,
  deleteSource,
} from "../controllers/jobSource.controller.js";
import protect from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", protect, getSources);
router.post("/", protect, addSource);
router.delete("/:id", protect, deleteSource);

export default router;