import AuroraHero from "../../components/AuroraHero";
import StatCard from "../../components/StatCard";

import {
  stats,
  recentNotes,
  weeklyProductivity,
} from "../../data/dashboardData";

import "./Dashboard.css";

export default function Dashboard() {
  const maxHours = Math.max(
    ...weeklyProductivity.map((d) => d.hours),
    1
  );

  return (
    <div className="page dashboard-page">

      {/* ================= HERO ================= */}

      <AuroraHero />


      <section className="stats-grid">
        {stats.map((stat) => (
          <StatCard
            key={stat.id}
            icon={stat.icon}
            label={stat.label}
            value={stat.value}
          />
        ))}
      </section>

     

      <section className="dashboard-lower">

      

        <div className="dashboard-panel">

          <div className="panel-header">
            <h2>Weekly Productivity</h2>
            <span>This Week</span>
          </div>

          <div className="bar-chart">

            {weeklyProductivity.map((day) => (
              <div
                className="bar-column"
                key={day.day}
              >

                <div
                  className="bar"
                  style={{
                    height: `${
                      (day.hours / maxHours) * 100
                    }%`,
                  }}
                  title={`${day.hours} Hours`}
                ></div>

                <span className="bar-label">
                  {day.day}
                </span>

              </div>
            ))}

          </div>

        </div>

        {/* Recent Notes */}

        <div className="dashboard-panel">

          <div className="panel-header">
            <h2>Recent Notes</h2>
            <span>Latest</span>
          </div>

          <ul className="recent-list">

            {recentNotes.map((note) => (

              <li key={note.id}>

                <div className="recent-left">

                  <span className="recent-title">
                    {note.title}
                  </span>

                </div>

                <span className="recent-date">
                  {note.date}
                </span>

              </li>

            ))}

          </ul>

        </div>

      </section>

    </div>
  );
}