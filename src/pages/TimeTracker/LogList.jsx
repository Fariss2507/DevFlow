import { motion, AnimatePresence } from 'framer-motion';
import { formatDuration } from '../../data/timeTrackerData';
import './TimeTracker.css';

export default function LogList({ logs, onDelete }) {
  const totalToday = logs
    .filter((l) => l.date === new Date().toISOString().split('T')[0])
    .reduce((sum, l) => sum + l.duration, 0);

  return (
    <motion.div
      className="log-panel"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut', delay: 0.1 }}
    >
      <div className="log-panel-header">
        <h2>Time Logs</h2>
        <span className="today-total">Today: {formatDuration(totalToday)}</span>
      </div>

      {logs.length === 0 ? (
        <p className="empty-state">No time logged yet.</p>
      ) : (
        <div className="log-list">
          <AnimatePresence>
            {logs.map((log) => (
              <motion.div
                className="log-item"
                key={log.id}
                layout
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20, height: 0 }}
                transition={{ duration: 0.25 }}
              >
                <div>
                  <div className="log-task">{log.task}</div>
                  <div className="log-date">{log.date}</div>
                </div>
                <div className="log-duration">{formatDuration(log.duration)}</div>
                <button className="log-delete" onClick={() => onDelete(log.id)}>✕</button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </motion.div>
  );
}