import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';
import api from '@/services/api';

import './Settings.css';

const cards = [
  'profile', 'appearance', 'password', 'notifications', 'language', 'logout',
];

export default function Settings() {
  const { user, logout, setUser } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const [profile, setProfile] = useState({
    name: user?.name || '',
    email: user?.email || '',
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
  const [errorMsg, setErrorMsg] = useState('');

  const handleProfileSave = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    try {
      const res = await api.put('/users/profile', profile);
      localStorage.setItem('devflow_user', JSON.stringify(res.data));
      if (setUser) setUser(res.data);
      setSavedMsg('Profile updated successfully.');
      setTimeout(() => setSavedMsg(''), 2500);
    } catch (err) {
      setErrorMsg(err.response?.data?.message || 'Failed to update profile');
    }
  };

  const handlePasswordSave = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    if (!passwords.current || !passwords.newPassword) return;
    if (passwords.newPassword !== passwords.confirm) {
      setErrorMsg('New passwords do not match.');
      return;
    }
    try {
      await api.put('/users/password', {
        currentPassword: passwords.current,
        newPassword: passwords.newPassword,
      });
      setPasswords({ current: '', newPassword: '', confirm: '' });
      setSavedMsg('Password changed successfully.');
      setTimeout(() => setSavedMsg(''), 2500);
    } catch (err) {
      setErrorMsg(err.response?.data?.message || 'Failed to change password');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="page">
      <h1>Settings</h1>

      <AnimatePresence>
        {savedMsg && (
          <motion.div
            className="settings-toast"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            {savedMsg}
          </motion.div>
        )}
        {errorMsg && (
          <motion.div
            className="settings-toast"
            style={{ background: '#fee2e2', color: '#991b1b' }}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            {errorMsg}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="settings-grid">
        <motion.div
          className="settings-card premium-card"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0 * 0.06 }}
        >
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

            <motion.button
              type="submit"
              className="btn-primary"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              Save Profile
            </motion.button>
          </form>
        </motion.div>

        <motion.div
          className="settings-card premium-card"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 * 0.06 }}
        >
          <h2>Appearance</h2>
          <div className="theme-toggle-row">
            <div>
              <div className="settings-label">Theme</div>
              <div className="settings-sublabel">
                {theme === 'light' ? 'Light mode is on' : 'Dark mode is on'}
              </div>
            </div>
            <motion.button
              className={`theme-switch ${theme === 'dark' ? 'dark' : ''}`}
              onClick={toggleTheme}
              aria-label="Toggle theme"
              whileTap={{ scale: 0.9 }}
            >
              <motion.span
                className="theme-switch-icon"
                layout
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              >
                {theme === 'light' ? '☀️' : '🌙'}
              </motion.span>
            </motion.button>
          </div>
        </motion.div>

        <motion.div
          className="settings-card premium-card"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2 * 0.06 }}
        >
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

            <motion.button
              type="submit"
              className="btn-primary"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              Update Password
            </motion.button>
          </form>
        </motion.div>

        <motion.div
          className="settings-card premium-card"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3 * 0.06 }}
        >
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
        </motion.div>

        <motion.div
          className="settings-card premium-card"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 4 * 0.06 }}
        >
          <h2>Language</h2>
          <label>Preferred Language</label>
          <select value={language} onChange={(e) => setLanguage(e.target.value)}>
            <option>English</option>
            <option>Urdu</option>
            <option>Spanish</option>
            <option>French</option>
          </select>
        </motion.div>

        <motion.div
          className="settings-card premium-card logout-card"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 5 * 0.06 }}
        >
          <h2>Account</h2>
          <p className="settings-sublabel">Log out of your DevFlow account on this device.</p>
          <motion.button
            className="btn-danger btn-logout"
            onClick={handleLogout}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            🚪 Log Out
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}