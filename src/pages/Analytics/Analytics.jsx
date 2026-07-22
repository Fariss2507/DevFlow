import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import StatSparkCard from './StatSparkCard';
import ProgressChart from './ProgressChart';
import BugsBarChart from './BugsBarChart';
import ActivityHeatmap from './ActivityHeatmap';
import api from '@/services/api';
import { activityHeatmap } from '@/data/analyticsData';

import './Analytics.css';

export default function Analytics() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const res = await api.get('/analytics');
      setData(res.data);
    } catch (err) {
      console.error('Failed to fetch analytics', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading || !data) {
    return (
      <div className="page">
        <h1>Analytics</h1>
        <motion.p
          className="empty-state"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          Loading analytics...
        </motion.p>
      </div>
    );
  }

  const summaryStats = [
    {
      id: 1,
      label: 'Tasks Completed',
      value: String(data.tasksCompleted),
      trend: data.monthlyProgress.map((m) => ({ v: m.tasks })),
    },
    {
      id: 2,
      label: 'Bugs Fixed',
      value: String(data.bugsFixed),
      trend: data.monthlyProgress.map((m) => ({ v: m.bugs })),
    },
    {
      id: 3,
      label: 'Coding Hours',
      value: `${data.codingHours}h`,
      trend: data.monthlyHours.map((m) => ({ v: m.hours })),
    },
  ];

  return (
    <div className="page">
      <h1>Analytics</h1>

      <div className="spark-grid">
        {summaryStats.map((stat, index) => (
          <motion.div
            key={stat.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: index * 0.08 }}
          >
            <StatSparkCard label={stat.label} value={stat.value} trend={stat.trend} />
          </motion.div>
        ))}
      </div>

      <div className="analytics-layout">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <ProgressChart data={data.monthlyProgress} />
        </motion.div>

        <div className="analytics-side">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            <BugsBarChart data={data.bugsFixedDaily} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}
          >
            <ActivityHeatmap data={activityHeatmap} />
          </motion.div>
        </div>
      </div>
    </div>
  );
}