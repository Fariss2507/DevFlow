const { Snippet } = require('../models');

exports.getSnippets = async (req, res, next) => {
  try {
    const snippets = await Snippet.find({ user: req.userId });
    res.json(snippets);
  } catch (err) {
    next(err);
  }
};

exports.createSnippet = async (req, res, next) => {
  try {
    const newSnippet = new Snippet({ ...req.body, user: req.userId });
    await newSnippet.save();
    res.status(201).json(newSnippet);
  } catch (err) {
    next(err);
  }
};

exports.updateSnippet = async (req, res, next) => {
  try {
    const updated = await Snippet.findOneAndUpdate(
      { _id: req.params.id, user: req.userId },
      req.body,
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: 'Snippet not found' });
    res.json(updated);
  } catch (err) {
    next(err);
  }
};

exports.deleteSnippet = async (req, res, next) => {
  try {
    const deleted = await Snippet.findOneAndDelete({ _id: req.params.id, user: req.userId });
    if (!deleted) return res.status(404).json({ message: 'Snippet not found' });
    res.json({ message: 'Snippet deleted' });
  } catch (err) {
    next(err);
  }
};
