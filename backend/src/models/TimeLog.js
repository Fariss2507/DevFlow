const mongoose = require('mongoose');

const timeLogSchema = new mongoose.Schema({
  task: { type: String, required: true },
  date: { type: String, required: true },
  duration: { type: Number, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

const TimeLog = mongoose.models.TimeLog || mongoose.model('TimeLog', timeLogSchema);
module.exports = TimeLog;
