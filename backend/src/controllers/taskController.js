const { Task } = require('../models');

exports.getTasks = async (req, res, next) => {
  try {
    const tasks = await Task.find({ user: req.userId });
    res.json(tasks);
  } catch (err) {
    next(err);
  }
};

exports.createTask = async (req, res, next) => {
  try {
    const newTask = new Task({ ...req.body, user: req.userId });
    await newTask.save();
    res.status(201).json(newTask);
  } catch (err) {
    next(err);
  }
};

exports.updateTask = async (req, res, next) => {
  try {
    const updated = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.userId },
      req.body,
      { new: true }
    );
    if (!updated) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.json(updated);
  } catch (err) {
    next(err);
  }
};

exports.deleteTask = async (req, res, next) => {
  try {
    const deleted = await Task.findOneAndDelete({ _id: req.params.id, user: req.userId });
    if (!deleted) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.json({ message: 'Task deleted' });
  } catch (err) {
    next(err);
  }
};
