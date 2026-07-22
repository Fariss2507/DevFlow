const { TimeLog } = require('../models');

exports.getTimeLogs = async (req, res, next) => {
  try {
    const logs = await TimeLog.find({ user: req.userId }).sort({ createdAt: -1 });
    res.json(logs);
  } catch (err) {
    next(err);
  }
};

exports.createTimeLog = async (req, res, next) => {
  try {
    const newLog = new TimeLog({ ...req.body, user: req.userId });
    await newLog.save();
    res.status(201).json(newLog);
  } catch (err) {
    next(err);
  }
};

exports.deleteTimeLog = async (req, res, next) => {
  try {
    const deleted = await TimeLog.findOneAndDelete({ _id: req.params.id, user: req.userId });
    if (!deleted) return res.status(404).json({ message: 'Log not found' });
    res.json({ message: 'Log deleted' });
  } catch (err) {
    next(err);
  }
};
