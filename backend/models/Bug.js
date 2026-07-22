const mongoose = require('mongoose');

const bugSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  severity: { type: String, default: 'Medium' },
  stepsToReproduce: String,
  screenshot: String,
  assignedDeveloper: String,
  status: { type: String, default: 'Open' },
  dateReported: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

module.exports = mongoose.model('Bug', bugSchema);