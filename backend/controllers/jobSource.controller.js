import JobSource from "../models/jobSource.js";

// GET ALL SOURCES
export const getSources = async (req, res) => {
  try {
    const sources = await JobSource.find();
    res.json(sources);
  } catch (error) {
    res.status(500).json({ message: "Error fetching sources" });
  }
};

// ADD SOURCE
export const addSource = async (req, res) => {
  try {
    const { name, api_url } = req.body;

    const newSource = await JobSource.create({
      name,
      api_url,
    });

    res.json(newSource);
  } catch (error) {
    res.status(500).json({ message: "Error adding source" });
  }
};

// DELETE SOURCE
export const deleteSource = async (req, res) => {
  try {
    await JobSource.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting source" });
  }
};