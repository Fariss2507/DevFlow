import './Tasks.css';

const priorityColors = {
  Low: '#9ca3af',
  Medium: '#d97706',
  High: 'var(--color-primary-dark)',
};

export default function TaskCard({ task, onEdit, onDelete, onDragStart }) {
  return (
    <div
      className="task-card"
      draggable
      onDragStart={(e) => onDragStart(e, task.id)}
      onClick={() => onEdit(task)}
    >
      <div className="task-card-top">
        <span
          className="priority-badge"
          style={{ background: priorityColors[task.priority] }}
        >
          {task.priority}
        </span>
        <button
          className="task-delete-btn"
          onClick={(e) => {
            e.stopPropagation();
            onDelete(task.id);
          }}
        >
          ✕
        </button>
      </div>

      <h4>{task.title}</h4>
      <p className="task-desc">{task.description}</p>

      <div className="task-labels">
        {task.labels.map((label) => (
          <span className="task-label" key={label}>{label}</span>
        ))}
      </div>

      <div className="task-meta">
        <span>📅 {task.dueDate}</span>
        <span>⏱ {task.estimatedTime}</span>
      </div>
    </div>
  );
}