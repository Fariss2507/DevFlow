import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';
import './Analytics.css';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="chart-tooltip-glass">
        <p className="chart-tooltip-label">{label}</p>
        {payload.map((p, idx) => (
          <p key={idx} className="chart-tooltip-val" style={{ color: p.color, fontSize: '0.85rem', margin: '4px 0 0 0' }}>
            {`${p.name}: ${p.value}`}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function ProgressChart({ data }) {
  return (
    <div className="chart-panel-premium">
      <h2>Monthly Progress</h2>
      <ResponsiveContainer width="100%" height={280}>
        <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="tasksGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.4} />
              <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0.0} />
            </linearGradient>
            <linearGradient id="bugsGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="var(--color-primary-dark)" stopOpacity={0.4} />
              <stop offset="95%" stopColor="var(--color-primary-dark)" stopOpacity={0.0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255, 255, 255, 0.08)" />
          <XAxis 
            dataKey="month" 
            tickLine={false}
            axisLine={false}
            tick={{ fill: 'var(--color-text-muted)', fontSize: 11, fontWeight: 600 }}
          />
          <YAxis 
            tickLine={false}
            axisLine={false}
            tick={{ fill: 'var(--color-text-muted)', fontSize: 11, fontWeight: 600 }}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'rgba(255, 255, 255, 0.1)', strokeWidth: 1 }} />
          <Legend 
            wrapperStyle={{ fontSize: '0.78rem', fontWeight: 600, paddingTop: '10px' }}
            iconType="circle"
          />
          <Area
            type="monotone"
            dataKey="tasks"
            name="Tasks Completed"
            stroke="var(--color-primary)"
            fill="url(#tasksGradient)"
            strokeWidth={3}
            activeDot={{ r: 6, strokeWidth: 0, fill: 'var(--color-accent)' }}
          />
          <Area
            type="monotone"
            dataKey="bugs"
            name="Bugs Fixed"
            stroke="var(--color-primary-dark)"
            fill="url(#bugsGradient)"
            strokeWidth={3}
            activeDot={{ r: 6, strokeWidth: 0, fill: 'var(--color-primary-dark)' }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}