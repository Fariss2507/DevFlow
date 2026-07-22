const mongoose = require('mongoose');

const repoSchema = new mongoose.Schema({
  projectName: { type: String, required: true },
  repoUrl: { type: String, required: true },
  branch: { type: String, default: 'main' },
  lastCommit: {
    message: String,
    author: String,
    date: String,
  },
  pullRequests: [
    {
      title: String,
      status: String,
    },
  ],
  issues: [
    {
      title: String,
      status: String,
    },
  ],
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

module.exports = mongoose.model('Repo', repoSchema);