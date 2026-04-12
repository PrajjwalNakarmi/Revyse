import mongoose from "mongoose";
import User from "../models/user.js";
import CV from "../models/CV.js";
import Job from "../models/jobs.js";

const normalizeRole = (role) => (role === "admin" ? "admin" : "user");

const toUserDto = (user) => ({
  id: user._id,
  name: user.name,
  email: user.email,
  role: user.role,
  createdAt: user.createdAt,
});

export const getAdminSummary = async (req, res) => {
  try {
    const [totalUsers, cvUploads, jobsSynced, adminUsers] = await Promise.all([
      User.countDocuments(),
      CV.countDocuments(),
      Job.countDocuments(),
      User.countDocuments({ role: "admin" }),
    ]);

    const dbReady = mongoose.connection.readyState === 1;

    return res.json({
      totalUsers,
      cvUploads,
      jobsSynced,
      issuesFound: dbReady ? 0 : 1,
      adminUsers,
      services: {
        database: dbReady ? "Connected" : "Disconnected",
        jobsApi: "Running",
        aiEngine: "Operational",
        ocrService: "Active",
      },
    });
  } catch (error) {
    return res.status(500).json({ message: "Failed to load summary" });
  }
};

export const getAdminUsers = async (req, res) => {
  try {
    const users = await User.find().select("name email role createdAt").sort({ createdAt: -1 });
    return res.json({ users: users.map(toUserDto) });
  } catch (error) {
    return res.status(500).json({ message: "Failed to load users" });
  }
};

export const createAdminUser = async (req, res) => {
  try {
    const { name, email, role, password } = req.body;

    if (!name || !email) {
      return res.status(400).json({ message: "Name and email are required" });
    }

    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) {
      return res.status(409).json({ message: "Email already in use" });
    }

    const user = await User.create({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      role: normalizeRole(role),
      password: password?.trim() || "password123",
    });

    return res.status(201).json({ user: toUserDto(user) });
  } catch (error) {
    return res.status(500).json({ message: "Failed to create user" });
  }
};

export const updateAdminUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, role, password } = req.body;

    const user = await User.findById(id).select("+password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (name) user.name = name.trim();

    if (email) {
      const nextEmail = email.trim().toLowerCase();
      const emailOwner = await User.findOne({ email: nextEmail, _id: { $ne: id } });
      if (emailOwner) {
        return res.status(409).json({ message: "Email already in use" });
      }
      user.email = nextEmail;
    }

    if (role) user.role = normalizeRole(role);
    if (password && password.trim()) user.password = password.trim();

    await user.save();
    return res.json({ user: toUserDto(user) });
  } catch (error) {
    return res.status(500).json({ message: "Failed to update user" });
  }
};

export const deleteAdminUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.role === "admin") {
      const totalAdmins = await User.countDocuments({ role: "admin" });
      if (totalAdmins <= 1) {
        return res.status(400).json({ message: "Cannot delete last admin" });
      }
    }

    await User.findByIdAndDelete(id);
    return res.json({ message: "User deleted" });
  } catch (error) {
    return res.status(500).json({ message: "Failed to delete user" });
  }
};

export const getAdminLogs = async (req, res) => {
  try {
    const dbReady = mongoose.connection.readyState === 1;
    const users = await User.countDocuments();
    const cvs = await CV.countDocuments();

    const logs = [
      {
        id: "log-db",
        time: new Date().toLocaleTimeString(),
        message: dbReady ? "Database connection healthy" : "Database connection issue detected",
        level: dbReady ? "Success" : "Warning",
      },
      {
        id: "log-users",
        time: new Date().toLocaleTimeString(),
        message: `Total users in system: ${users}`,
        level: "Info",
      },
      {
        id: "log-cv",
        time: new Date().toLocaleTimeString(),
        message: `Total CV uploads processed: ${cvs}`,
        level: "Info",
      },
    ];

    return res.json({ logs });
  } catch (error) {
    return res.status(500).json({ message: "Failed to load logs" });
  }
};

export const getAdminCVs = async (req, res) => {
  try {
    const cvs = await CV.find()
      .populate("user_id", "name email")
      .select("file_name createdAt extracted_text user_id")
      .sort({ createdAt: -1 })
      .limit(100);

    const items = cvs.map((cv) => ({
      id: cv._id,
      user: cv.user_id?.name || cv.user_id?.email || "Unknown user",
      file: cv.file_name,
      status: cv.extracted_text ? "Processed" : "Review",
      createdAt: cv.createdAt,
    }));

    return res.json({ cvs: items });
  } catch (error) {
    return res.status(500).json({ message: "Failed to load CVs" });
  }
};

export const getAdminJobsStatus = async (req, res) => {
  try {
    const dbJobs = await Job.countDocuments();

    let apiJobs = 0;
    let apiStatus = "Live";

    try {
      const response = await fetch("http://localhost:5000/api/jobs");
      if (response.ok) {
        const data = await response.json();
        apiJobs = (data.jobs || []).length;
      } else {
        apiStatus = "Degraded";
      }
    } catch (error) {
      apiStatus = "Offline";
    }

    const services = [
      { name: "Public jobs API", status: apiJobs > 0 ? "Active" : "Checking", label: apiStatus },
      { name: "Database jobs index", status: dbJobs > 0 ? `${dbJobs} stored` : "Empty", label: "Live" },
      { name: "Sync worker", status: "Ready", label: "Idle" },
    ];

    return res.json({
      jobsCount: apiJobs,
      dbJobs,
      lastSyncedAt: new Date().toISOString(),
      services,
    });
  } catch (error) {
    return res.status(500).json({ message: "Failed to load jobs status" });
  }
};
