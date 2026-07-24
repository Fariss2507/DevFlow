import { motion } from "framer-motion";
import { User, Calendar } from 'lucide-react';

const severityClassMap = {
  Low: 'severity-low',
  Medium: 'severity-medium',
  High: 'severity-high',
  Critical: 'severity-critical',
};

const statusClassMap = {
  Open: 'bug-status-open',
  'In Progress': 'bug-status-progress',
  Fixed: 'bug-status-fixed',
  Closed: 'bug-status-closed',
};

export default function BugCard({ bug, onEdit, onDelete }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="bug-card-premium"
    >
      {/* Header */}
      <div className="bug-card-header">
        <div className="bug-badges">
          <span className={`bug-severity-badge ${severityClassMap[bug.severity] || 'severity-low'}`}>
            {bug.severity}
          </span>
          <span className={`bug-status-badge ${statusClassMap[bug.status] || 'bug-status-open'}`}>
            {bug.status}
          </span>
        </div>
        <span className="bug-dev-info">
          <Calendar size={12} />
          {bug.dateReported}
        </span>
      </div>

      {/* Main Details */}
      <div className="bug-card-body">
        <h3 className="bug-card-title truncate" title={bug.title}>{bug.title}</h3>
        <p className="bug-card-desc">{bug.description}</p>

        {bug.stepsToReproduce && (
          <div className="bug-steps-box">
            <strong className="bug-steps-title">Steps to Reproduce:</strong>
            <pre className="bug-steps-pre">{bug.stepsToReproduce}</pre>
          </div>
        )}

        {bug.screenshot && (
          <img src={bug.screenshot} alt="Bug screenshot" className="bug-card-screenshot" />
        )}
      </div>

      {/* Footer */}
      <div className="bug-card-footer">
        <span className="bug-dev-info">
          <User size={12} />
          <span>Dev: {bug.assignedDeveloper || 'Unassigned'}</span>
        </span>
        <div className="bug-card-actions">
          <button className="btn-card-edit" onClick={() => onEdit(bug)}>
            Edit
          </button>
          <button className="btn-card-delete" onClick={() => onDelete(bug.id)}>
            Delete
          </button>
        </div>
      </div>
    </motion.div>
  );
}