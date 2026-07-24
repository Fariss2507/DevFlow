const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  folder: { type: String, default: 'Root' },
  category: { type: String, default: 'General' }, // Code, Image, Document, Data, Config
  size: { type: String, default: '0 KB' },
  fileType: { type: String, default: 'txt' },
  url: { type: String, default: '' },
  project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' }
}, { timestamps: true });

const FileModel = mongoose.models.File || mongoose.model('File', fileSchema);
module.exports = FileModel;
