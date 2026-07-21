import StatSparkCard from './StatSparkCard';
import ProgressChart from './ProgressChart';
import BugsBarChart from './BugsBarChart';
import ActivityHeatmap from './ActivityHeatmap';
import {
  summaryStats, monthlyProgress, bugsFixedDaily, activityHeatmap,
} from '../../data/analyticsData';
import './Analytics.css';

export default function Analytics() {
  return (
    <div className="page">
      <h1>Analytics</h1>

      <div className="spark-grid">
        {summaryStats.map((stat) => (
          <StatSparkCard key={stat.id} label={stat.label} value={stat.value} trend={stat.trend} />
        ))}
      </div>

      <div className="analytics-layout">
        <ProgressChart data={monthlyProgress} />
        <div className="analytics-side">
          <BugsBarChart data={bugsFixedDaily} />
          <ActivityHeatmap data={activityHeatmap} />
        </div>
      </div>
    </div>
  );
}