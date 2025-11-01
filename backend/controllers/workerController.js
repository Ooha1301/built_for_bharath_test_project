import Worker from "../models/worker.js";

// Get all workers
export const getWorkers = async (req, res) => {
  try {
    const workers = await Worker.find();
    res.json(workers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Add a new worker
export const addWorker = async (req, res) => {
  try {
    const worker = new Worker(req.body);
    const newWorker = await worker.save();
    res.status(201).json(newWorker);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
