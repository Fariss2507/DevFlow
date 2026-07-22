import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import './Analytics.css';

export default function BugsBarChart({ data }) {
  return (
    <div className="side-panel">
      <motion.h3 initial={{ opacity: 0 }} animate={{ opacity: 1 }}>Bugs Fixed Daily</motion.h3>
      <ResponsiveContainer width="100%" height={160}>
        <BarChart data={data}>
          <XAxis dataKey="day" stroke="var(--color-text-muted)" fontSize={11} />
          <YAxis hide />
          <Tooltip
            contentStyle={{
              background: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              borderRadius: '8px',
              fontSize: '0.8rem',
            }}
          />
          <Bar dataKey="count" fill="var(--color-accent)" radius={[4, 4, 0, 0]} animationDuration={800} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}