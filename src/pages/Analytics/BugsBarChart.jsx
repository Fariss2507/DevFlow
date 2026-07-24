import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import './Analytics.css';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="chart-tooltip-glass">
        <p className="chart-tooltip-label">{label}</p>
        <p className="chart-tooltip-val" style={{ color: 'var(--color-accent)' }}>
          {`Bugs Fixed: ${payload[0].value}`}
        </p>
      </div>
    );
  }
  return null;
};

export default function BugsBarChart({ data }) {
  return (
    <div className="side-panel-premium">
      <motion.h3 initial={{ opacity: 0 }} animate={{ opacity: 1 }}>Bugs Fixed Daily</motion.h3>
      <ResponsiveContainer width="100%" height={160}>
        <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <XAxis 
            dataKey="day" 
            tickLine={false} 
            axisLine={false} 
            tick={{ fill: 'var(--color-text-muted)', fontSize: 11, fontWeight: 600 }} 
          />
          <YAxis hide />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255, 255, 255, 0.05)' }} />
          <Bar 
            dataKey="count" 
            fill="var(--color-accent)" 
            radius={[6, 6, 0, 0]} 
            animationDuration={800} 
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}