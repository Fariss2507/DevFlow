import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import './Settings.css';

export default function Settings() {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const [profile, setProfile] = useState({
    name: user?.name || 'Your Name',
    email: user?.email || 'you@example.com',
  });
  const [passwords, setPasswords] = useState({
    current: '',
    newPassword: '',
    confirm: '',
  });
  const [notifications, setNotifications] = useState({
    deadlines: true,
    newTasks: true,
    bugAssignments: true,
    releases: false,
  });
  const [language, setLanguage] = useState('English');
  const [savedMsg, setSavedMsg] = useState('');

  const handleProfileSave = (e) => {
    e.preventDefault();
    setSavedMsg('Profile updated successfully.');
    setTimeout(() => setSavedMsg(''), 2500);
  };

  const handlePasswordSave = (e) => {
    e.preventDefault();
    if (!passwords.current || !passwords.newPassword) return;
    if (passwords.newPassword !== passwords.confirm) {
      alert('New passwords do not match.');
      return;
    }
    setPasswords({ current: '', newPassword: '', confirm: '' });
    setSavedMsg('Password changed successfully.');
    setTimeout(() => setSavedMsg(''), 2500);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="page">
      <h1>Settings</h1>

      {savedMsg && <div className="settings-toast">{savedMsg}</div>}

      <div className="settings-grid">
        {/* Profile */}
        <div className="settings-card">
          <h2>Profile</h2>
          <form onSubmit={handleProfileSave}>
            <label>Full Name</label>
            <input
              value={profile.name}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
            />

            <label>Email</label>
            <input
              type="email"
              value={profile.email}
              onChange={(e) => setProfile({ ...profile, email: e.target.value })}
            />

            <button type="submit" className="btn-primary">Save Profile</button>
          </form>
        </div>

        {/* Theme */}
        <div className="settings-card">
          <h2>Appearance</h2>
          <div className="theme-toggle-row">
            <div>
              <div className="settings-label">Theme</div>
              <div className="settings-sublabel">
                {theme === 'light' ? 'Light mode is on' : 'Dark mode is on'}
              </div>
            </div>
            <button
              className={`theme-switch ${theme === 'dark' ? 'dark' : ''}`}
              onClick={toggleTheme}
              aria-label="Toggle theme"
            >
              <span className="theme-switch-icon">{theme === 'light' ? '☀️' : '🌙'}</span>
            </button>
          </div>
        </div>

        {/* Password */}
        <div className="settings-card">
          <h2>Change Password</h2>
          <form onSubmit={handlePasswordSave}>
            <label>Current Password</label>
            <input
              type="password"
              value={passwords.current}
              onChange={(e) => setPasswords({ ...passwords, current: e.target.value })}
            />

            <label>New Password</label>
            <input
              type="password"
              value={passwords.newPassword}
              onChange={(e) => setPasswords({ ...passwords, newPassword: e.target.value })}
            />

            <label>Confirm New Password</label>
            <input
              type="password"
              value={passwords.confirm}
              onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
            />

            <button type="submit" className="btn-primary">Update Password</button>
          </form>
        </div>

        {/* Notifications */}
        <div className="settings-card">
          <h2>Notifications</h2>
          {Object.entries({
            deadlines: 'Deadline reminders',
            newTasks: 'New task assignments',
            bugAssignments: 'Bug assignments',
            releases: 'Release announcements',
          }).map(([key, label]) => (
            <label className="checkbox-row" key={key}>
              <input
                type="checkbox"
                checked={notifications[key]}
                onChange={(e) =>
                  setNotifications({ ...notifications, [key]: e.target.checked })
                }
              />
              {label}
            </label>
          ))}
        </div>

        {/* Language */}
        <div className="settings-card">
          <h2>Language</h2>
          <label>Preferred Language</label>
          <select value={language} onChange={(e) => setLanguage(e.target.value)}>
            <option>English</option>
            <option>Urdu</option>
            <option>Spanish</option>
            <option>French</option>
          </select>
        </div>

      
        <div className="settings-card logout-card">
          <h2>Account</h2>
          <p className="settings-sublabel">Log out of your DevFlow account on this device.</p>
          <button className="btn-danger btn-logout" onClick={handleLogout}>
            🚪 Log Out
          </button>
        </div>
      </div>
    </div>
  );
}