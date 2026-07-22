import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { formatDuration } from '../../data/timeTrackerData';
import './TimeTracker.css';

export default function Timer({ onLogSaved }) {
  const [taskName, setTaskName] = useState('');
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setSeconds((s) => s + 1);
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [running]);

  const handleStart = () => {
    if (!taskName.trim()) return;
    setRunning(true);
  };

  const handleStop = () => {
    setRunning(false);
  };

 const handleSave = () => {
  if (seconds === 0) return;
  onLogSaved({
    id: Date.now(),
    task: taskName || 'Untitled task',
    date: new Date().toISOString().split('T')[0],
    duration: seconds,
  });
  setSeconds(0);
  setTaskName('');
  setRunning(false);
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
              onClick={handleStart}
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
              onClick={handleStop}
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