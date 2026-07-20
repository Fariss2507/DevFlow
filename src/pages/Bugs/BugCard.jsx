import './Bugs.css';

const severityColors = {
  Low: '#9ca3af',
  Medium: '#d97706',
  High: '#dc2626',
  Critical: 'var(--color-primary-dark)',
};

const statusColors = {
  Open: '#dc2626',
  'In Progress': '#d97706',
  Fixed: 'var(--color-accent)',
  Closed: '#9ca3af',
};

export default function BugCard({ bug, onEdit, onDelete }) {
  return (
    <div className="bug-card">
      <div className="bug-card-top">
        <div className="bug-badges">
          <span className="severity-badge" style={{ background: severityColors[bug.severity] }}>
            {bug.severity}
          </span>
          <span className="status-badge" style={{ background: statusColors[bug.status] }}>
            {bug.status}
          </span>
        </div>
        <span className="bug-date">📅 {bug.dateReported}</span>
      </div>

      <h3>{bug.title}</h3>
      <p className="bug-desc">{bug.description}</p>

      {bug.stepsToReproduce && (
        <div className="bug-steps">
          <strong>Steps to Reproduce:</strong>
          <pre>{bug.stepsToReproduce}</pre>
        </div>
      )}

      {bug.screenshot && (
        <img src={bug.screenshot} alt="Bug screenshot" className="bug-screenshot" />
      )}

      <div className="bug-footer">
        <span className="bug-assignee">👤 {bug.assignedDeveloper || 'Unassigned'}</span>
        <div className="bug-actions">
          <button className="btn-secondary" onClick={() => onEdit(bug)}>Edit</button>
          <button className="btn-danger" onClick={() => onDelete(bug.id)}>Delete</button>
        </div>
      </div>
    </div>
  );
}