const mongoose = require('mongoose');

const aiHistorySchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  tool: { type: String, required: true }, // e.g. 'chat', 'code', 'bugfix', 'readme', 'doc', 'explainer', 'mongo', 'api'
  prompt: { type: String, required: true },
  response: { type: String, required: true },
  tokensUsed: { type: Number, default: 0 },
}, { timestamps: true });

const AiHistory = mongoose.models.AiHistory || mongoose.model('AiHistory', aiHistorySchema);
module.exports = AiHistory;
