import { motion } from 'framer-motion';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';
import './Analytics.css';

export default function StatSparkCard({ label, value, trend }) {
  return (
    <motion.div
      className="spark-card-premium"
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      <div className="spark-card-info">
        <span className="spark-label">{label}</span>
        <motion.span
          className="spark-value"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {value}
        </motion.span>
      </div>
      <div className="spark-chart">
        <ResponsiveContainer width="100%" height={40}>
          <AreaChart data={trend}>
            <defs>
              <linearGradient id={`spark-${label}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--color-accent)" stopOpacity={0.4} />
                <stop offset="100%" stopColor="var(--color-accent)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <Area
              type="monotone"
              dataKey="v"
              stroke="var(--color-primary)"
              strokeWidth={2}
              fill={`url(#spark-${label})`}
              isAnimationActive={true}
              animationDuration={1000}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}