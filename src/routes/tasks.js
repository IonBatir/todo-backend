const express = require("express");
const router = express.Router();
const Task = require("../models/Task");

// GET /tasks
router.get("/", async (req, res) => {
  const tasks = await Task.find().sort("-createdAt");
  res.json(tasks);
});

// POST /tasks
router.post("/", async (req, res) => {
  const task = new Task(req.body);
  await task.save();
  res.status(201).json(task);
});

// PUT /tasks/:id
router.put("/:id", async (req, res) => {
  const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(task);
});

// DELETE /tasks/:id
router.delete("/:id", async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.status(204).end();
});

module.exports = router;
