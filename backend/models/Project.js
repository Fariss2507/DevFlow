const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  techStack: [String],
  githubRepo: String,
  liveDemo: String,
  status: { type: String, default: 'Planning' },
  deadline: String,
  teamMembers: [String],
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

module.exports = mongoose.model('Project', projectSchema);