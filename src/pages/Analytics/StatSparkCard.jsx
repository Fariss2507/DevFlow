import { AreaChart, Area, ResponsiveContainer } from 'recharts';
import './Analytics.css';

export default function StatSparkCard({ label, value, trend }) {
  return (
    <div className="spark-card">
      <div className="spark-card-info">
        <span className="spark-label">{label}</span>
        <span className="spark-value">{value}</span>
      </div>
      <div className="spark-chart">
        <ResponsiveContainer width="100%" height={40}>
          <AreaChart data={trend}>
            <defs>
              <linearGradient id={`spark-${label}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--color-accent)" stopOpacity={0.5} />
                <stop offset="100%" stopColor="var(--color-accent)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <Area
              type="monotone"
              dataKey="v"
              stroke="var(--color-primary)"
              strokeWidth={2}
              fill={`url(#spark-${label})`}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}