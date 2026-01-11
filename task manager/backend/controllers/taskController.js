const Task = require("../models/Task");

exports.createTask = async (req, res) => {
  const { title } = req.body;

  if (!title || title.trim() === "") {
    return res.status(400).json({ message: "Task cannot be empty" });
  }

  const task = await Task.create({
    title,
    user: req.user.id
  });

  res.status(201).json(task);
};

exports.getTasks = async (req, res) => {
  const tasks = await Task.find({ user: req.user.id });
  res.json(tasks);
};

exports.updateTask = async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task || task.user.toString() !== req.user.id) {
    return res.status(403).json({ message: "Not allowed" });
  }

  task.completed = !task.completed;
  await task.save();

  res.json(task);
};

exports.deleteTask = async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task || task.user.toString() !== req.user.id) {
    return res.status(403).json({ message: "Not allowed" });
  }

  await task.deleteOne();
  res.json({ message: "Task deleted" });
};
