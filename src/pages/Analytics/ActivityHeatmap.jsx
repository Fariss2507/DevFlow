import { motion } from 'framer-motion';
import './Analytics.css';

export default function ActivityHeatmap({ data }) {
  const maxVal = Math.max(...data.values.flat());

  const getLevel = (val) => {
    if (val === 0) return 0;
    const ratio = val / maxVal;
    if (ratio <= 0.25) return 1;
    if (ratio <= 0.5) return 2;
    if (ratio <= 0.75) return 3;
    return 4;
  };

  return (
    <div className="side-panel">
      <h3>Coding Activity</h3>
      <div className="heatmap">
        <div className="heatmap-row heatmap-header">
          <span className="heatmap-hour-label" />
          {data.days.map((d, i) => (
            <span className="heatmap-day-label" key={i}>{d}</span>
          ))}
        </div>
        {data.values.map((row, rowIdx) => (
          <div className="heatmap-row" key={rowIdx}>
            <span className="heatmap-hour-label">{data.hours[rowIdx]}</span>
            {row.map((val, colIdx) => (
              <motion.span
                className={`heatmap-cell heat-level-${getLevel(val)}`}
                key={colIdx}
                title={`${val} sessions`}
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2, delay: (rowIdx * row.length + colIdx) * 0.01 }}
                whileHover={{ scale: 1.15 }}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}