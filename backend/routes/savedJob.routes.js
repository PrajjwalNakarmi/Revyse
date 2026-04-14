import express from "express";
import protect from "../middleware/auth.middleware.js";
import {
  getSavedJobs,
  saveJob,
  deleteJob,
} from "../controllers/savedJob.controller.js";

const router = express.Router();

router.get("/", protect, getSavedJobs);
router.post("/", protect, saveJob);
router.delete("/:id", protect, deleteJob);

export default router;