const { Event } = require('../models');

exports.getEvents = async (req, res, next) => {
  try {
    const events = await Event.find({ user: req.userId });
    res.json(events);
  } catch (err) {
    next(err);
  }
};

exports.createEvent = async (req, res, next) => {
  try {
    const newEvent = new Event({ ...req.body, user: req.userId });
    await newEvent.save();
    res.status(201).json(newEvent);
  } catch (err) {
    next(err);
  }
};

exports.deleteEvent = async (req, res, next) => {
  try {
    const deleted = await Event.findOneAndDelete({ _id: req.params.id, user: req.userId });
    if (!deleted) return res.status(404).json({ message: 'Event not found' });
    res.json({ message: 'Event deleted' });
  } catch (err) {
    next(err);
  }
};
