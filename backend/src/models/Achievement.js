const mongoose = require('mongoose');

const achievementSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  icon: { type: String, default: '🏆' },
  unlocked: { type: Boolean, default: false },
  progress: { type: Number, default: 0 },
  maxProgress: { type: Number, default: 100 }
}, { timestamps: true });

const Achievement = mongoose.models.Achievement || mongoose.model('Achievement', achievementSchema);
module.exports = Achievement;
