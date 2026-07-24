const mongoose = require('mongoose');

const deploymentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  environment: { type: String, default: 'production' }, // production, preview
  status: { type: String, default: 'Success' }, // Success, Building, Failed
  commitMessage: { type: String, default: 'Initial commit' },
  branch: { type: String, default: 'main' },
  logs: [{ type: String }],
  envVars: [{ key: String, value: String }]
}, { timestamps: true });

const Deployment = mongoose.models.Deployment || mongoose.model('Deployment', deploymentSchema);
module.exports = Deployment;
