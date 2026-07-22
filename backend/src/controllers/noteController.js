const { Note } = require('../models');

exports.getNotes = async (req, res, next) => {
  try {
    const notes = await Note.find({ user: req.userId });
    res.json(notes);
  } catch (err) {
    next(err);
  }
};

exports.createNote = async (req, res, next) => {
  try {
    const newNote = new Note({ ...req.body, user: req.userId });
    await newNote.save();
    res.status(201).json(newNote);
  } catch (err) {
    next(err);
  }
};

exports.updateNote = async (req, res, next) => {
  try {
    const updated = await Note.findOneAndUpdate(
      { _id: req.params.id, user: req.userId },
      req.body,
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: 'Note not found' });
    res.json(updated);
  } catch (err) {
    next(err);
  }
};

exports.deleteNote = async (req, res, next) => {
  try {
    const deleted = await Note.findOneAndDelete({ _id: req.params.id, user: req.userId });
    if (!deleted) return res.status(404).json({ message: 'Note not found' });
    res.json({ message: 'Note deleted' });
  } catch (err) {
    next(err);
  }
};
