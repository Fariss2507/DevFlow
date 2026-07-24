import { motion, AnimatePresence } from 'framer-motion';
import { useTimer } from '@/context/TimerContext';
import { formatDuration } from '@/data/timeTrackerData';
import { Play, Pause, Save } from 'lucide-react';
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
      className="timer-box-premium"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      <input
        type="text"
        className="timer-task-input"
        style={{ width: '100%', marginBottom: '20px' }}
        placeholder="What are you working on?"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
        disabled={running}
      />

      <motion.div
        className="timer-display-premium"
        animate={running ? { scale: [1, 1.02, 1] } : { scale: 1 }}
        transition={running ? { duration: 1.5, repeat: Infinity, ease: 'easeInOut' } : {}}
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
              <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                <Play size={14} fill="currentColor" />
                Start
              </span>
            </motion.button>
          ) : (
            <motion.button
              key="stop"
              className="btn-stop"
              onClick={stopTimer}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                <Pause size={14} fill="currentColor" />
                Stop
              </span>
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
          <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
            <Save size={14} />
            Save Log
          </span>
        </motion.button>
      </div>
    </motion.div>
  );
}