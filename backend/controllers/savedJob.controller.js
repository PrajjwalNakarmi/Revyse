import SavedJob from "../models/SavedJobs.js";

// GET USER JOBS
export const getSavedJobs = async (req, res) => {
  try {
    const jobs = await SavedJob.find({ user_id: req.user._id });
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// SAVE JOB
export const saveJob = async (req, res) => {
  try {
    const job = await SavedJob.create({
      user_id: req.user._id,
      ...req.body,
    });

    res.status(201).json(job);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE JOB
export const deleteJob = async (req, res) => {
  try {
    await SavedJob.findByIdAndDelete(req.params.id);
    res.json({ message: "Job removed" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};