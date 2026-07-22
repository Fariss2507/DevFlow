const { Project } = require('../models');

exports.getProjects = async (req, res, next) => {
  try {
    const projects = await Project.find({ user: req.userId });
    res.json(projects);
  } catch (err) {
    next(err);
  }
};

exports.createProject = async (req, res, next) => {
  try {
    const newProject = new Project({ ...req.body, user: req.userId });
    await newProject.save();
    res.status(201).json(newProject);
  } catch (err) {
    next(err);
  }
};

exports.updateProject = async (req, res, next) => {
  try {
    const updated = await Project.findOneAndUpdate(
      { _id: req.params.id, user: req.userId },
      req.body,
      { new: true }
    );
    if (!updated) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.json(updated);
  } catch (err) {
    next(err);
  }
};

exports.deleteProject = async (req, res, next) => {
  try {
    const deleted = await Project.findOneAndDelete({ _id: req.params.id, user: req.userId });
    if (!deleted) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.json({ message: 'Project deleted' });
  } catch (err) {
    next(err);
  }
};
