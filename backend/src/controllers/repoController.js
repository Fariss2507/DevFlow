const { Repo } = require('../models');

exports.getRepos = async (req, res, next) => {
  try {
    const repos = await Repo.find({ user: req.userId });
    res.json(repos);
  } catch (err) {
    next(err);
  }
};

exports.createRepo = async (req, res, next) => {
  try {
    const newRepo = new Repo({ ...req.body, user: req.userId });
    await newRepo.save();
    res.status(201).json(newRepo);
  } catch (err) {
    next(err);
  }
};

exports.updateRepo = async (req, res, next) => {
  try {
    const updated = await Repo.findOneAndUpdate(
      { _id: req.params.id, user: req.userId },
      req.body,
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: 'Repo not found' });
    res.json(updated);
  } catch (err) {
    next(err);
  }
};

exports.deleteRepo = async (req, res, next) => {
  try {
    const deleted = await Repo.findOneAndDelete({ _id: req.params.id, user: req.userId });
    if (!deleted) return res.status(404).json({ message: 'Repo not found' });
    res.json({ message: 'Repo deleted' });
  } catch (err) {
    next(err);
  }
};
