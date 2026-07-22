import { motion, AnimatePresence } from 'framer-motion';
import { useTimer } from '../../context/TimerContext';
import { formatDuration } from '../../data/timeTrackerData';
import './TimeTracker.css';

export default function Timer({ onLogSaved }) {
  const { taskName, setTaskName, seconds, running, startTimer, stopTimer, resetTimer } = useTimer();

  const handleSave = () => {
    if (seconds === 0) return;
    onLogSaved({
      task: taskName || 'Untitled task',
      date: new Date().toISOString().split('T')[0],
      duration: seconds,
    });
    resetTimer();
  };

  return (
    <motion.div
      className="timer-box"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      <input
        type="text"
        className="timer-task-input"
        placeholder="What are you working on?"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
        disabled={running}
      />

      <motion.div
        className="timer-display"
        animate={running ? { scale: [1, 1.03, 1] } : { scale: 1 }}
        transition={running ? { duration: 1, repeat: Infinity, ease: 'easeInOut' } : {}}
      >
        {formatDuration(seconds)}
      </motion.div>

      <div className="timer-controls">
        <AnimatePresence mode="wait">
          {!running ? (
            <motion.button
              key="start"
              className="btn-primary"
              onClick={startTimer}
              disabled={!taskName.trim()}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              ▶ Start
            </motion.button>
          ) : (
            <motion.button
              key="stop"
              className="btn-danger btn-stop"
              onClick={stopTimer}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              ⏸ Stop
            </motion.button>
          )}
        </AnimatePresence>

        <motion.button
          className="btn-secondary"
          onClick={handleSave}
          disabled={seconds === 0 || running}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          💾 Save Log
        </motion.button>
      </div>
    </motion.div>
  );
}