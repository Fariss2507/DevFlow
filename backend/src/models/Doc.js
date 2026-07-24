const mongoose = require('mongoose');

const docSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  content: { type: String, default: '' },
  project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },
  versionHistory: [{
    version: { type: Number, required: true },
    content: { type: String, required: true },
    updatedAt: { type: Date, default: Date.now }
  }]
}, { timestamps: true });

const Doc = mongoose.models.Doc || mongoose.model('Doc', docSchema);
module.exports = Doc;
