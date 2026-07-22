const { Bug, Notification } = require('../models');

exports.getBugs = async (req, res, next) => {
  try {
    const bugs = await Bug.find({ user: req.userId });
    res.json(bugs);
  } catch (err) {
    next(err);
  }
};

exports.createBug = async (req, res, next) => {
  try {
    const newBug = new Bug({ ...req.body, user: req.userId });
    await newBug.save();
    
    // Auto-create a corresponding system notification
    await Notification.create({
      type: 'Bug',
      message: `New bug reported: "${newBug.title}"`,
      user: req.userId,
    });

    res.status(201).json(newBug);
  } catch (err) {
    next(err);
  }
};

exports.updateBug = async (req, res, next) => {
  try {
    const updated = await Bug.findOneAndUpdate(
      { _id: req.params.id, user: req.userId },
      req.body,
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: 'Bug not found' });
    res.json(updated);
  } catch (err) {
    next(err);
  }
};

exports.deleteBug = async (req, res, next) => {
  try {
    const deleted = await Bug.findOneAndDelete({ _id: req.params.id, user: req.userId });
    if (!deleted) return res.status(404).json({ message: 'Bug not found' });
    res.json({ message: 'Bug deleted' });
  } catch (err) {
    next(err);
  }
};
