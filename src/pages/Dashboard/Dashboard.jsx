import StatCard from '../../components/StatCard';
import { stats, recentNotes, weeklyProductivity } from '../../data/dashboardData';
import './Dashboard.css';

export default function Dashboard() {
  const maxHours = Math.max(...weeklyProductivity.map((d) => d.hours), 1);

  return (
    <div className="page">
      <h1>Dashboard</h1>

      <div className="stats-grid">
        {stats.map((stat) => (
          <StatCard key={stat.id} icon={stat.icon} label={stat.label} value={stat.value} />
        ))}
      </div>

      <div className="dashboard-lower">
        <div className="dashboard-panel">
          <h2>Weekly Productivity</h2>
          <div className="bar-chart">
            {weeklyProductivity.map((d) => (
              <div className="bar-column" key={d.day}>
                <div
                  className="bar"
                  style={{ height: `${(d.hours / maxHours) * 100}%` }}
                  title={`${d.hours}h`}
                />
                <span className="bar-label">{d.day}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="dashboard-panel">
          <h2>Recent Notes</h2>
          <ul className="recent-list">
            {recentNotes.map((note) => (
              <li key={note.id}>
                <span className="recent-title">{note.title}</span>
                <span className="recent-date">{note.date}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}