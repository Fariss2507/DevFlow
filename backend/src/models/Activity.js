const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  action: { type: String, required: true }, // e.g. 'Created Task', 'Fixed Bug', 'Uploaded File', 'Generated AI'
  details: { type: String, default: '' },
  category: { type: String, default: 'general' },
}, { timestamps: true });

const Activity = mongoose.models.Activity || mongoose.model('Activity', activitySchema);
module.exports = Activity;
