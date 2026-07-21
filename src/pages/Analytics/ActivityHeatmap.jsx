import './Analytics.css';

export default function ActivityHeatmap({ data }) {
  const maxVal = Math.max(...data.values.flat());

  const getColor = (val) => {
    if (val === 0) return 'var(--color-bg)';
    const opacity = 0.2 + (val / maxVal) * 0.8;
    return `rgba(23, 67, 63, ${opacity})`;
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
              <span
                className="heatmap-cell"
                key={colIdx}
                style={{ background: getColor(val) }}
                title={`${val} sessions`}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}