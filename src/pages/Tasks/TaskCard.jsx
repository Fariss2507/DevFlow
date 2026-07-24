import { motion } from "framer-motion";
import { Calendar, Clock, X } from 'lucide-react';

const priorityClassMap = {
  Low: 'priority-low-badge',
  Medium: 'priority-medium-badge',
  High: 'priority-high-badge',
};

export default function TaskCard({ task, onEdit, onDelete, onDragStart }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      whileHover={{ y: -2 }}
      draggable
      onDragStart={(e) => onDragStart(e, task.id)}
      onClick={() => onEdit(task)}
      className="task-card-premium"
    >
      <div className="task-card-header">
        <span className={`task-priority-badge priority-badge ${priorityClassMap[task.priority] || 'priority-low-badge'}`}>
          {task.priority}
        </span>
        <button
          className="task-close-btn"
          onClick={(e) => {
            e.stopPropagation();
            onDelete(task.id);
          }}
          title="Delete Task"
        >
          <X size={13} />
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <h4 className="task-card-title truncate" title={task.title}>{task.title}</h4>
        <p className="task-card-desc line-clamp-2">{task.description}</p>
      </div>

      {task.labels && task.labels.length > 0 && (
        <div className="task-card-labels">
          {task.labels.map((label) => (
            <span className="task-card-label" key={label}>
              {label}
            </span>
          ))}
        </div>
      )}

      <div className="task-card-footer font-mono">
        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <Calendar size={12} />
          {task.dueDate}
        </span>
        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <Clock size={12} />
          {task.estimatedTime}
        </span>
      </div>
    </motion.div>
  );
}