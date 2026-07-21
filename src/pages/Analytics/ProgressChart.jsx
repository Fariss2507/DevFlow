import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';
import './Analytics.css';

export default function ProgressChart({ data }) {
  return (
    <div className="chart-panel">
      <h2>Monthly Progress</h2>
      <ResponsiveContainer width="100%" height={280}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="tasksGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--color-primary)" stopOpacity={0.6} />
              <stop offset="100%" stopColor="var(--color-primary)" stopOpacity={0.05} />
            </linearGradient>
            <linearGradient id="bugsGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--color-primary-dark)" stopOpacity={0.6} />
              <stop offset="100%" stopColor="var(--color-primary-dark)" stopOpacity={0.05} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
          <XAxis dataKey="month" stroke="var(--color-text-muted)" fontSize={12} />
          <YAxis stroke="var(--color-text-muted)" fontSize={12} />
          <Tooltip
            contentStyle={{
              background: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              borderRadius: '8px',
              fontSize: '0.8rem',
            }}
          />
          <Legend wrapperStyle={{ fontSize: '0.8rem' }} />
          <Area
            type="monotone"
            dataKey="tasks"
            name="Tasks Completed"
            stroke="var(--color-primary)"
            fill="url(#tasksGradient)"
            strokeWidth={2}
          />
          <Area
            type="monotone"
            dataKey="bugs"
            name="Bugs Fixed"
            stroke="var(--color-primary-dark)"
            fill="url(#bugsGradient)"
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}