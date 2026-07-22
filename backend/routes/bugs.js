const Notification = require('../models/Notification');

const express = require('express');
const Bug = require('../models/Bug');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

router.get('/', authMiddleware, async (req, res) => {
  try {
    const bugs = await Bug.find({ user: req.userId });
    res.json(bugs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/', authMiddleware, async (req, res) => {
  try {
    const newBug = new Bug({ ...req.body, user: req.userId });
    await newBug.save();
    await Notification.create({
  type: 'Bug',
  message: `New bug reported: "${newBug.title}"`,
  user: req.userId,
});
    res.status(201).json(newBug);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const updated = await Bug.findOneAndUpdate(
      { _id: req.params.id, user: req.userId },
      req.body,
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: 'Bug not found' });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const deleted = await Bug.findOneAndDelete({ _id: req.params.id, user: req.userId });
    if (!deleted) return res.status(404).json({ message: 'Bug not found' });
    res.json({ message: 'Bug deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;