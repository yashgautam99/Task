import express from "express";
import Task from "../models/Task.js";
import { verifyToken } from "../middleware/auth.js";
const router = express.Router();

// Create Task
router.post("/", verifyToken, async (req, res) => {
  try {
    const { title, description, status, priority } = req.body;
    const newTask = new Task({ title, description, status, priority });
    await newTask.save();
    res.status(201).json(newTask);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get Tasks with Pagination & Filtering
router.get("/", verifyToken, async (req, res) => {
  try {
    const { page = 1, limit = 10, priority, status } = req.query;
    let query = {};
    if (priority) query.priority = priority;
    if (status) query.status = status;

    const tasks = await Task.find(query)
      .sort({ priority: -1, createdAt: 1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update Task
router.put("/:id", verifyToken, async (req, res) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updatedTask);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete Task
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: "Task deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
