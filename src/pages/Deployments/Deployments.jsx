import { useState, useEffect } from 'react';
import { Rocket, Terminal, CheckCircle2, GitBranch, Key, Plus } from 'lucide-react';
import api from '@/services/api';
import './Deployments.css';

export default function Deployments() {
  const [deployments, setDeployments] = useState([]);
  const [selectedDep, setSelectedDep] = useState(null);

  useEffect(() => {
    fetchDeployments();
  }, []);

  const fetchDeployments = async () => {
    try {
      const res = await api.get('/deployments');
      setDeployments(res.data || []);
      if (res.data.length > 0 && !selectedDep) {
        setSelectedDep(res.data[0]);
      }
    } catch (err) {
      console.error('Failed to load deployments');
    }
  };

  const handleTriggerDeploy = async () => {
    try {
      const newDep = {
        name: `devforge-preview-manual-${Date.now().toString().slice(-4)}`,
        environment: 'preview',
        status: 'Success',
        commitMessage: 'Manual build trigger',
        branch: 'main'
      };
      await api.post('/deployments', newDep);
      fetchDeployments();
    } catch (err) {
      alert('Deployment trigger failed');
    }
  };

  return (
    <div className="page-container deployments-container">
      <div className="page-header">
        <div>
          <h1 className="page-title">Deployments & CI/CD</h1>
          <p className="page-subtitle">Production & preview deployment history, build logs, and environment variable management</p>
        </div>
        <button className="btn-primary" onClick={handleTriggerDeploy}>
          <Rocket size={16} /> Deploy New Build
        </button>
      </div>

      <div className="deployments-layout">
        {/* Deployments List */}
        <div className="deployments-list glass-card">
          <div className="list-title">Deployment History</div>
          {deployments.map(dep => (
            <div
              key={dep._id}
              className={`dep-card ${selectedDep?._id === dep._id ? 'active' : ''}`}
              onClick={() => setSelectedDep(dep)}
            >
              <div className="dep-header">
                <span className="dep-name">{dep.name}</span>
                <span className={`status-badge ${dep.status.toLowerCase()}`}>
                  <CheckCircle2 size={12} /> {dep.status}
                </span>
              </div>
              <div className="dep-meta">
                <span className="env-tag">{dep.environment}</span>
                <span><GitBranch size={12} /> {dep.branch}</span>
              </div>
              <div className="commit-msg">{dep.commitMessage}</div>
            </div>
          ))}
        </div>

        {/* Selected Deployment Details & Logs */}
        <div className="deployment-details glass-card">
          {selectedDep ? (
            <>
              <div className="details-header">
                <div>
                  <h3>{selectedDep.name}</h3>
                  <p className="sub-text">Deployed on {new Date(selectedDep.createdAt || Date.now()).toLocaleString()}</p>
                </div>
                <span className={`status-badge large ${selectedDep.status.toLowerCase()}`}>
                  {selectedDep.status}
                </span>
              </div>

              {/* Build Logs Terminal */}
              <div className="terminal-card">
                <div className="terminal-header">
                  <Terminal size={14} />
                  <span>Build & Deployment Logs</span>
                </div>
                <div className="terminal-logs">
                  {selectedDep.logs?.map((log, idx) => (
                    <div key={idx} className="log-line">{log}</div>
                  ))}
                </div>
              </div>

              {/* Environment Variables Section */}
              <div className="env-vars-card">
                <h4><Key size={14} /> Environment Variables</h4>
                <div className="env-table">
                  {selectedDep.envVars?.map((env, i) => (
                    <div key={i} className="env-row">
                      <span className="env-key">{env.key}</span>
                      <span className="env-val">{env.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <div className="empty-state">Select a deployment to view build logs.</div>
          )}
        </div>
      </div>
    </div>
  );
}
