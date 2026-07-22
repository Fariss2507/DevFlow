import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Timer from './Timer';
import LogList from './LogList';
import api from '@/services/api';

import './TimeTracker.css';

export default function TimeTracker() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    try {
      const res = await api.get('/timelogs');
      const mapped = res.data.map((l) => ({ ...l, id: l._id }));
      setLogs(mapped);
    } catch (err) {
      console.error('Failed to fetch logs', err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogSaved = async (log) => {
    try {
      const res = await api.post('/timelogs', log);
      const created = { ...res.data, id: res.data._id };
      setLogs([created, ...logs]);
    } catch (err) {
      console.error('Failed to save log', err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/timelogs/${id}`);
      setLogs(logs.filter((l) => l.id !== id));
    } catch (err) {
      console.error('Failed to delete log', err);
    }
  };

  return (
    <div className="page">
      <h1>Time Tracker</h1>

      {loading ? (
        <motion.p
          className="empty-state"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          Loading logs...
        </motion.p>
      ) : (
        <div className="time-tracker-layout">
          <Timer onLogSaved={handleLogSaved} />
          <LogList logs={logs} onDelete={handleDelete} />
        </div>
      )}
    </div>
  );
}