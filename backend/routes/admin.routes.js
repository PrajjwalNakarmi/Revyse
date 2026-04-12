import express from "express";
import adminOnly from "../middleware/admin.middleware.js";
import {
  getAdminSummary,
  getAdminUsers,
  createAdminUser,
  updateAdminUser,
  deleteAdminUser,
  getAdminLogs,
  getAdminCVs,
  getAdminJobsStatus,
} from "../controllers/admin.controller.js";

const router = express.Router();

router.get("/summary", adminOnly, getAdminSummary);
router.get("/users", adminOnly, getAdminUsers);
router.post("/users", adminOnly, createAdminUser);
router.put("/users/:id", adminOnly, updateAdminUser);
router.delete("/users/:id", adminOnly, deleteAdminUser);
router.get("/logs", adminOnly, getAdminLogs);
router.get("/cvs", adminOnly, getAdminCVs);
router.get("/jobs-status", adminOnly, getAdminJobsStatus);

export default router;
