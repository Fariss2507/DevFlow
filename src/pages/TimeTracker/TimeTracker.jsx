import { useState } from 'react';
import Timer from './Timer';
import LogList from './LogList';
import { initialLogs } from '../../data/timeTrackerData';
import './TimeTracker.css';

export default function TimeTracker() {
  const [logs, setLogs] = useState(initialLogs);

  const handleLogSaved = (log) => {
    setLogs([log, ...logs]);
  };

  const handleDelete = (id) => {
    setLogs(logs.filter((l) => l.id !== id));
  };

  return (
    <div className="page">
      <h1>Time Tracker</h1>

      <div className="time-tracker-layout">
        <Timer onLogSaved={handleLogSaved} />
        <LogList logs={logs} onDelete={handleDelete} />
      </div>
    </div>
  );
}