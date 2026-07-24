import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  FolderKanban, 
  CheckSquare, 
  ListTodo, 
  Bug, 
  Calendar, 
  FileText, 
  Sparkles, 
  ArrowUpRight, 
  CheckCircle2, 
  AlertCircle 
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { motion } from "framer-motion";
import api from "@/services/api";
import { useAuth } from '@/context/AuthContext';
import "./Dashboard.css";

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="chart-tooltip-glass">
        <p className="chart-tooltip-label">{label}</p>
        <p className="chart-tooltip-val">{`${payload[0].value} Hours`}</p>
      </div>
    );
  }
  return null;
};

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState([]);
  const [recentNotes, setRecentNotes] = useState([]);
  const [weeklyProductivity, setWeeklyProductivity] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const [dashRes, tasksRes] = await Promise.all([
        api.get("/dashboard"),
        api.get("/tasks")
      ]);
      setStats(dashRes.data.stats || []);
      setRecentNotes(dashRes.data.recentNotes || []);
      setWeeklyProductivity(dashRes.data.weeklyProductivity || []);
      setTasks((tasksRes.data || []).map(t => ({ ...t, id: t._id })));
    } catch (err) {
      console.error("Failed to fetch dashboard", err);
    } finally {
      setLoading(false);
    }
  };

  const getCardClass = (label) => {
    if (label.includes("Projects")) return "projects";
    if (label.includes("Pending")) return "pending";
    if (label.includes("Completed")) return "completed";
    if (label.includes("Bugs")) return "bugs";
    return "projects";
  };

  const getCardIcon = (label) => {
    if (label.includes("Projects")) return <FolderKanban size={24} />;
    if (label.includes("Pending")) return <ListTodo size={24} />;
    if (label.includes("Completed")) return <CheckSquare size={24} />;
    if (label.includes("Bugs")) return <Bug size={24} />;
    return <FolderKanban size={24} />;
  };

  // Calculate completion stats
  const pendingCount = stats.find(s => s.label.includes("Pending"))?.value || 0;
  const completedCount = stats.find(s => s.label.includes("Completed"))?.value || 0;
  const totalTasks = pendingCount + completedCount;
  const completionRate = totalTasks > 0 ? Math.round((completedCount / totalTasks) * 100) : 0;

  // SVG Progress Ring calculations
  const radius = 60;
  const stroke = 8;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (completionRate / 100) * circumference;

  // Filter pending priority tasks
  const priorityTasks = tasks
    .filter(t => t.status !== 'Completed')
    .sort((a, b) => {
      const priorityWeight = { 'High': 3, 'Medium': 2, 'Low': 1 };
      return (priorityWeight[b.priority] || 0) - (priorityWeight[a.priority] || 0);
    })
    .slice(0, 3);

  // Motion variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        type: "spring", 
        stiffness: 100, 
        damping: 15 
      } 
    }
  };

  if (loading) {
    return (
      <div className="page dashboard-page">
        <div className="welcome-hero">
          <div className="hero-main-content">
            <h1 className="hero-title">Welcome back{user?.name ? `, ${user.name.split(' ')[0]}` : ''}.</h1>
            <p className="hero-subtitle">Loading your workspace analytics...</p>
          </div>
        </div>
      </div>
    );
  }

  // Get current formatted date
  const formattedDate = new Date().toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric'
  });

  return (
    <motion.div 
      className="page dashboard-page"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      {/* Welcome Banner */}
      <motion.div className="welcome-hero" variants={itemVariants}>
        <div className="hero-main-content">
          <h1 className="hero-title">Welcome back{user?.name ? `, ${user.name.split(' ')[0]}` : ''}!</h1>
          <p className="hero-subtitle">
            {completionRate >= 80 
              ? "Awesome work! You are cruising through your tasks today." 
              : "Here is a quick overview of your development sprint today."}
          </p>
        </div>
        <div className="hero-meta-panel">
          <div className="hero-date-pill">
            <Calendar size={16} />
            <span>{formattedDate}</span>
          </div>
          <div className="hero-tip">
            <Sparkles size={14} />
            <span>Keep pushing coding limits!</span>
          </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <motion.section className="stats-grid-premium" variants={itemVariants}>
        {stats.map((stat) => (
          <div 
            key={stat.id} 
            className={`metric-card-premium ${getCardClass(stat.label)}`}
            onClick={() => navigate(stat.label.includes("Projects") ? "/projects" : stat.label.includes("Bugs") ? "/bugs" : "/tasks")}
          >
            <div className="metric-icon-wrap">
              {getCardIcon(stat.label)}
            </div>
            <div className="metric-info">
              <span className="metric-value">{stat.value}</span>
              <span className="metric-label">{stat.label}</span>
            </div>
          </div>
        ))}
      </motion.section>

      {/* Charts & Completion Row */}
      <div className="dashboard-middle-grid">
        {/* Weekly Productivity AreaChart */}
        <motion.div className="panel-premium" variants={itemVariants}>
          <div className="panel-premium-header">
            <h2>Weekly Productivity</h2>
            <span className="panel-badge">This Week</span>
          </div>
          <div style={{ width: '100%', height: 240 }}>
            {weeklyProductivity.length === 0 ? (
              <p className="card-list-empty">No activity logged this week</p>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={weeklyProductivity} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorHours" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0.0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255, 255, 255, 0.08)" />
                  <XAxis 
                    dataKey="day" 
                    tickLine={false} 
                    axisLine={false}
                    tick={{ fill: 'var(--color-text-muted)', fontSize: 11, fontWeight: 600 }}
                  />
                  <YAxis 
                    tickLine={false} 
                    axisLine={false}
                    tick={{ fill: 'var(--color-text-muted)', fontSize: 11, fontWeight: 600 }}
                  />
                  <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'rgba(255, 255, 255, 0.1)', strokeWidth: 1 }} />
                  <Area 
                    type="monotone" 
                    dataKey="hours" 
                    stroke="var(--color-primary)" 
                    strokeWidth={3}
                    fillOpacity={1} 
                    fill="url(#colorHours)" 
                    activeDot={{ r: 6, strokeWidth: 0, fill: 'var(--color-accent)' }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </div>
        </motion.div>

        {/* Task Completion Progress Ring */}
        <motion.div className="panel-premium" variants={itemVariants}>
          <div className="panel-premium-header">
            <h2>Task Progress</h2>
            <span className="panel-badge">Sprints</span>
          </div>
          <div className="completion-panel-content">
            <div className="progress-ring-container">
              <svg height={radius * 2} width={radius * 2} className="progress-ring">
                <circle
                  stroke="rgba(255, 255, 255, 0.1)"
                  fill="transparent"
                  strokeWidth={stroke}
                  r={normalizedRadius}
                  cx={radius}
                  cy={radius}
                />
                <circle
                  stroke="var(--color-primary)"
                  fill="transparent"
                  strokeWidth={stroke}
                  strokeDasharray={circumference + ' ' + circumference}
                  style={{ strokeDashoffset, transition: 'stroke-dashoffset 0.8s ease' }}
                  strokeLinecap="round"
                  r={normalizedRadius}
                  cx={radius}
                  cy={radius}
                />
                <text
                  x="50%"
                  y="50%"
                  dy="6px"
                  textAnchor="middle"
                  className="progress-ring-text"
                >
                  {completionRate}%
                </text>
              </svg>
            </div>
            <div className="completion-stats">
              <div className="completion-stat-item">
                <div className="completion-stat-color" style={{ backgroundColor: 'var(--color-completed)' }}></div>
                <div className="completion-stat-info">
                  <span className="completion-stat-num">{completedCount}</span>
                  <span className="completion-stat-label">Done Tasks</span>
                </div>
              </div>
              <div className="completion-stat-item">
                <div className="completion-stat-color" style={{ backgroundColor: 'var(--color-pending)' }}></div>
                <div className="completion-stat-info">
                  <span className="completion-stat-num">{pendingCount}</span>
                  <span className="completion-stat-label">Pending Tasks</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom Grid: Recent Notes & Critical Tasks */}
      <div className="dashboard-bottom-grid">
        {/* Recent Notes Panel */}
        <motion.div className="panel-premium" variants={itemVariants}>
          <div className="panel-premium-header">
            <h2>Recent Notes</h2>
            <ArrowUpRight size={18} className="text-muted-foreground" style={{ cursor: 'pointer' }} onClick={() => navigate('/notes')} />
          </div>
          <div className="card-list-premium">
            {recentNotes.length === 0 ? (
              <p className="card-list-empty">No notes created yet</p>
            ) : (
              recentNotes.map((note) => (
                <div 
                  key={note.id} 
                  className="list-item-premium note-item-premium"
                  onClick={() => navigate('/notes')}
                >
                  <div className="list-item-left">
                    <FileText size={18} className="text-muted-foreground" />
                    <div className="list-item-details">
                      <span className="list-item-title">{note.title}</span>
                      <span className="list-item-desc">Click to view note details</span>
                    </div>
                  </div>
                  <div className="list-item-right">
                    <span className="list-item-meta">{note.date}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </motion.div>

        {/* Priority Tasks Panel */}
        <motion.div className="panel-premium" variants={itemVariants}>
          <div className="panel-premium-header">
            <h2>Critical Tasks</h2>
            <ArrowUpRight size={18} className="text-muted-foreground" style={{ cursor: 'pointer' }} onClick={() => navigate('/tasks')} />
          </div>
          <div className="card-list-premium">
            {priorityTasks.length === 0 ? (
              <p className="card-list-empty">No critical tasks pending</p>
            ) : (
              priorityTasks.map((task) => (
                <div 
                  key={task.id} 
                  className={`list-item-premium task-item-premium priority-${task.priority.toLowerCase()}`}
                  onClick={() => navigate('/tasks')}
                >
                  <div className="list-item-left">
                    {task.priority === 'High' ? (
                      <AlertCircle size={18} style={{ color: 'var(--color-bugs)' }} />
                    ) : (
                      <CheckCircle2 size={18} style={{ color: 'var(--color-pending)' }} />
                    )}
                    <div className="list-item-details">
                      <span className="list-item-title">{task.title}</span>
                      <span className="list-item-desc">{task.description || "No description provided"}</span>
                    </div>
                  </div>
                  <div className="list-item-right">
                    <span className={`priority-badge priority-${task.priority.toLowerCase()}-badge`}>
                      {task.priority}
                    </span>
                    {task.dueDate && (
                      <span className="list-item-meta" style={{ marginTop: '4px' }}>
                        Due {task.dueDate}
                      </span>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}