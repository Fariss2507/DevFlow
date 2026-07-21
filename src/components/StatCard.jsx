import './StatCard.css';

export default function StatCard({ icon, label, value }) {
  return (
    <div className="stat-card premium-card">
      <div className="stat-icon">{icon}</div>
      <div>
        <div className="stat-value">{value}</div>
        <div className="stat-label">{label}</div>
      </div>
    </div>
  );
}