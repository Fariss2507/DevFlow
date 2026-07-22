import { useState, useEffect } from "react";
import { AuroraHero } from "@/components/features";
import { StatCard, AgentBentoGrid } from "@/components/common";
import api from "@/services/api";



import "./Dashboard.css";

export default function Dashboard() {
  const [stats, setStats] = useState([]);
  const [recentNotes, setRecentNotes] = useState([]);
  const [weeklyProductivity, setWeeklyProductivity] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const res = await api.get("/dashboard");
      setStats(res.data.stats);
      setRecentNotes(res.data.recentNotes);
      setWeeklyProductivity(res.data.weeklyProductivity);
    } catch (err) {
      console.error("Failed to fetch dashboard", err);
    } finally {
      setLoading(false);
    }
  };

  const maxHours = Math.max(
    ...weeklyProductivity.map((d) => d.hours),
    1
  );

  if (loading) {
    return (
      <div className="page dashboard-page">
        <AuroraHero />
        <p className="empty-state">Loading dashboard...</p>
      </div>
    );
  }

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

      {/* ================= BENTO GRID ================= */}
      <div className="my-8">
        <h2 className="text-xl font-bold text-foreground text-left px-4 mb-4 tracking-tight">AI Agent Workspace</h2>
        <AgentBentoGrid />
      </div>


     

      <section className="dashboard-lower">

      

        <div className="dashboard-panel">

          <div className="panel-header">
            <h2>Weekly Productivity</h2>
            <span>This Week</span>
          </div>

          <div className="bar-chart">

            {weeklyProductivity.map((day, i) => (
              <div
                className="bar-column"
                key={i}
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

            {recentNotes.length === 0 ? (
              <p className="empty-mini">No notes yet</p>
            ) : (
              recentNotes.map((note) => (

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

              ))
            )}

          </ul>

        </div>

      </section>

    </div>
  );
}