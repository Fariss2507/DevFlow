const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  priority: { type: String, default: 'Medium' },
  dueDate: String,
  status: { type: String, default: 'Todo' },
  labels: [String],
  estimatedTime: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

const Task = mongoose.models.Task || mongoose.model('Task', taskSchema);
module.exports = Task;
