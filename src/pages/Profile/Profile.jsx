import { useState, useEffect } from 'react';
import { User, Award, Activity as ActivityIcon, Code, Zap, ShieldCheck, RefreshCw, Check, Sparkles } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import api from '@/services/api';
import './Profile.css';

const AVAILABLE_SKILLS = [
  'React', 'Next.js', 'Node.js', 'MongoDB', 'TypeScript', 'Tailwind CSS',
  'Docker', 'GraphQL', 'Python', 'PostgreSQL', 'Vue.js', 'Express',
  'AWS / Cloud', 'System Architecture'
];

export default function Profile() {
  const { user } = useAuth();
  const [achievements, setAchievements] = useState([]);
  const [activities, setActivities] = useState([]);
  const [showModal, setShowModal] = useState(false);

  // Profile Assessment State (loaded from localStorage or defaults)
  const [profileData, setProfileData] = useState(() => {
    const saved = localStorage.getItem('user_developer_profile');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return {
      roleTitle: 'Developer (Unassessed)',
      focus: 'Full Stack',
      experience: '2-4 Years',
      skills: ['React', 'Node.js', 'TypeScript', 'MongoDB'],
      score: 88,
      assessed: false
    };
  });

  // Questionnaire form state
  const [focus, setFocus] = useState(profileData.focus || 'Full Stack');
  const [experience, setExperience] = useState(profileData.experience || '2-4 Years');
  const [selectedSkills, setSelectedSkills] = useState(profileData.skills || []);

  useEffect(() => {
    fetchProfileData();
    // If not assessed yet, automatically prompt questionnaire
    if (!profileData.assessed) {
      setShowModal(true);
    }
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
      console.error('Failed to load achievements/activities');
    }
  };

  const toggleSkill = (skill) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter(s => s !== skill));
    } else {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  const handleSaveAssessment = (e) => {
    e.preventDefault();

    // Calculate dynamic developer title
    let prefix = 'Junior';
    if (experience.includes('2-4')) prefix = 'Intermediate';
    if (experience.includes('5+')) prefix = 'Senior Lead';

    let title = `${prefix} ${focus} Engineer`;
    if (prefix === 'Senior Lead' && focus === 'Full Stack') title = 'Senior Full Stack Architect';
    if (prefix === 'Junior' && focus === 'Frontend') title = 'Frontend Developer';
    if (prefix === 'Senior Lead' && focus === 'Backend') title = 'Principal Backend Engineer';

    // Calculate productivity score
    const calculatedScore = Math.min(99, 70 + (selectedSkills.length * 2.5) + (experience.includes('5+') ? 10 : 5));

    const updated = {
      roleTitle: title,
      focus,
      experience,
      skills: selectedSkills.length > 0 ? selectedSkills : ['JavaScript', 'HTML/CSS'],
      score: Math.round(calculatedScore),
      assessed: true
    };

    setProfileData(updated);
    localStorage.setItem('user_developer_profile', JSON.stringify(updated));
    setShowModal(false);
  };

  return (
    <div className="page-container profile-container">
      <div className="page-header">
        <div>
          <h1 className="page-title">Developer Profile & Persona</h1>
          <p className="page-subtitle">Custom skill assessment, gamified achievements, and activity logs</p>
        </div>
        <button className="btn-primary" onClick={() => setShowModal(true)}>
          <RefreshCw size={16} /> Re-evaluate Role Assessment
        </button>
      </div>

      <div className="profile-hero glass-card">
        <div className="avatar-lg">
          {user?.name ? user.name.charAt(0).toUpperCase() : 'D'}
        </div>
        <div className="profile-info">
          <h2>{user?.name || 'Developer'}</h2>
          <p className="profile-email">{user?.email}</p>
          <div className="badge-row">
            <span className="profile-badge">
              <ShieldCheck size={14} /> {profileData.roleTitle}
            </span>
            <span className="profile-badge score">
              <Zap size={14} /> Productivity Score: {profileData.score}/100
            </span>
          </div>
        </div>
      </div>

      <div className="profile-grid">
        {/* Skills & Bio */}
        <div className="skills-card glass-card">
          <div className="card-header-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3><Code size={18} /> Evaluated Skills ({profileData.skills.length})</h3>
            <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>Focus: {profileData.focus}</span>
          </div>
          <div className="skills-tags">
            {profileData.skills.map(skill => (
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
            {activities.length === 0 ? (
              <div className="empty-state">No activity logs recorded yet.</div>
            ) : (
              activities.map(act => (
                <div key={act._id} className="timeline-item">
                  <div className="timeline-dot" />
                  <div className="timeline-content">
                    <div className="timeline-action">{act.action}</div>
                    <div className="timeline-details">{act.details}</div>
                    <div className="timeline-time">{new Date(act.createdAt).toLocaleString()}</div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Developer Role Questionnaire Modal */}
      {showModal && (
        <div className="assessment-modal-overlay" onClick={() => setShowModal(false)}>
          <div className="assessment-modal glass-card" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2><Sparkles className="text-purple-400" size={20} /> Developer Skill & Role Assessment</h2>
              <button className="close-btn" onClick={() => setShowModal(false)}>✕</button>
            </div>
            <p className="modal-subtitle">Answer a few questions to determine your actual developer role and skills persona.</p>

            <form onSubmit={handleSaveAssessment} className="assessment-form">
              <div className="form-group">
                <label>1. Primary Development Focus</label>
                <div className="option-chips">
                  {['Full Stack', 'Frontend', 'Backend', 'Mobile', 'DevOps & Cloud'].map(f => (
                    <button
                      type="button"
                      key={f}
                      className={`chip-btn ${focus === f ? 'active' : ''}`}
                      onClick={() => setFocus(f)}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <label>2. Years of Professional Experience</label>
                <div className="option-chips">
                  {['0-1 Years (Beginner)', '2-4 Years (Intermediate)', '5+ Years (Senior / Lead)'].map(exp => (
                    <button
                      type="button"
                      key={exp}
                      className={`chip-btn ${experience === exp ? 'active' : ''}`}
                      onClick={() => setExperience(exp)}
                    >
                      {exp}
                    </button>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <label>3. Select Technologies You Work With</label>
                <div className="skill-selector-grid">
                  {AVAILABLE_SKILLS.map(skill => {
                    const isSelected = selectedSkills.includes(skill);
                    return (
                      <button
                        type="button"
                        key={skill}
                        className={`skill-select-btn ${isSelected ? 'selected' : ''}`}
                        onClick={() => toggleSkill(skill)}
                      >
                        {isSelected && <Check size={14} />}
                        <span>{skill}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn-secondary" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  Calculate My Persona
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
