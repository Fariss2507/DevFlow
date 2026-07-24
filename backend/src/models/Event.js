const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: { type: String, required: true },
  type: { type: String, default: 'Task' },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

const Event = mongoose.models.Event || mongoose.model('Event', eventSchema);
module.exports = Event;
