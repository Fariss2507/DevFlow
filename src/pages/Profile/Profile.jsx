import { useState, useEffect } from 'react';
import { User, Award, Activity as ActivityIcon, Code, Zap, CheckCircle, ShieldCheck } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import api from '@/services/api';
import './Profile.css';

export default function Profile() {
  const { user } = useAuth();
  const [achievements, setAchievements] = useState([]);
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    fetchProfileData();
  }, []);

  const fetchProfileData = async () => {
    try {
      const [achRes, actRes] = await Promise.all([
        api.get('/achievements'),
        api.get('/activity')
      ]);
      setAchievements(achRes.data || []);
      setActivities(actRes.data || []);
    } catch (err) {
      console.error('Failed to load profile data');
    }
  };

  const skills = ['React 19', 'Next.js 14', 'Node.js', 'MongoDB', 'TypeScript', 'Tailwind CSS', 'Docker', 'GraphQL'];

  return (
    <div className="page-container profile-container">
      <div className="profile-hero glass-card">
        <div className="avatar-lg">
          {user?.name ? user.name.charAt(0).toUpperCase() : 'D'}
        </div>
        <div className="profile-info">
          <h2>{user?.name || 'Developer'}</h2>
          <p className="profile-email">{user?.email}</p>
          <div className="badge-row">
            <span className="profile-badge"><ShieldCheck size={14} /> Senior Full Stack Developer</span>
            <span className="profile-badge score"><Zap size={14} /> Productivity Score: 98/100</span>
          </div>
        </div>
      </div>

      <div className="profile-grid">
        {/* Skills & Bio */}
        <div className="skills-card glass-card">
          <h3><Code size={18} /> Developer Skills</h3>
          <div className="skills-tags">
            {skills.map(skill => (
              <span key={skill} className="skill-chip">{skill}</span>
            ))}
          </div>
        </div>

        {/* Achievements Gallery */}
        <div className="achievements-card glass-card">
          <h3><Award size={18} /> Gamified Achievements</h3>
          <div className="achievements-grid">
            {achievements.map(ach => (
              <div key={ach._id} className={`ach-item ${ach.unlocked ? 'unlocked' : 'locked'}`}>
                <div className="ach-icon">{ach.icon}</div>
                <div className="ach-details">
                  <div className="ach-title">{ach.title}</div>
                  <div className="ach-desc">{ach.description}</div>
                  <div className="ach-progress-bar">
                    <div className="ach-progress-fill" style={{ width: `${(ach.progress / ach.maxProgress) * 100}%` }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Activity Timeline */}
        <div className="activity-card glass-card">
          <h3><ActivityIcon size={18} /> Activity Timeline</h3>
          <div className="activity-timeline">
            {activities.map(act => (
              <div key={act._id} className="timeline-item">
                <div className="timeline-dot" />
                <div className="timeline-content">
                  <div className="timeline-action">{act.action}</div>
                  <div className="timeline-details">{act.details}</div>
                  <div className="timeline-time">{new Date(act.createdAt).toLocaleString()}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
