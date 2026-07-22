const { Notification } = require('../models');

exports.getNotifications = async (req, res, next) => {
  try {
    const notifications = await Notification.find({ user: req.userId }).sort({ createdAt: -1 });
    res.json(notifications);
  } catch (err) {
    next(err);
  }
};

exports.markAsRead = async (req, res, next) => {
  try {
    const updated = await Notification.findOneAndUpdate(
      { _id: req.params.id, user: req.userId },
      { read: true },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    next(err);
  }
};

exports.markAllAsRead = async (req, res, next) => {
  try {
    await Notification.updateMany({ user: req.userId }, { read: true });
    res.json({ message: 'All marked as read' });
  } catch (err) {
    next(err);
  }
};

exports.clearAll = async (req, res, next) => {
  try {
    await Notification.deleteMany({ user: req.userId });
    res.json({ message: 'All notifications cleared' });
  } catch (err) {
    next(err);
  }
};
