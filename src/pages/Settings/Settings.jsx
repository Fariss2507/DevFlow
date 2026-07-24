import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import { useThemeStore } from '@/store/themeStore';
import api from '@/services/api';
import { LogOut, Save, ShieldAlert, Sparkles, Check, AlertCircle } from 'lucide-react';
import './Settings.css';

export default function Settings() {
  const { user, logout, setUser } = useAuth();
  const { theme, toggleTheme } = useThemeStore();
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
  const [notifications, setNotifications] = useState(() => {
    const saved = localStorage.getItem('devflow_notifications');
    return saved ? JSON.parse(saved) : {
      deadlines: true,
      newTasks: true,
      bugAssignments: true,
      releases: false,
    };
  });
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('devflow_language') || 'English';
  });
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
            className="settings-toast-premium"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <Check size={16} />
            <span>{savedMsg}</span>
          </motion.div>
        )}
        {errorMsg && (
          <motion.div
            className="settings-toast-premium"
            style={{ background: 'rgba(220, 38, 38, 0.1)', color: 'var(--color-bugs)', borderColor: 'rgba(220, 38, 38, 0.15)' }}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <AlertCircle size={16} />
            <span>{errorMsg}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="settings-grid">
        {/* Profile Card */}
        <motion.div
          className="settings-card-premium"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0 * 0.06 }}
        >
          <h2>Profile Information</h2>
          <form onSubmit={handleProfileSave}>
            <label>Full Name</label>
            <input
              value={profile.name}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
            />

            <label>Email Address</label>
            <input
              type="email"
              value={profile.email}
              onChange={(e) => setProfile({ ...profile, email: e.target.value })}
            />

            <motion.button
              type="submit"
              className="btn-primary"
              style={{ marginTop: '24px' }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                <Save size={14} />
                Save Changes
              </span>
            </motion.button>
          </form>
        </motion.div>

        {/* Appearance Card */}
        <motion.div
          className="settings-card-premium"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 * 0.06 }}
        >
          <h2>Appearance Settings</h2>
          <div className="theme-toggle-row">
            <div>
              <div className="settings-label">Theme Mode</div>
              <div className="settings-sublabel">
                {theme === 'light' ? 'Light mode enabled' : 'Dark mode enabled'}
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

        {/* Change Password Card */}
        <motion.div
          className="settings-card-premium"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2 * 0.06 }}
        >
          <h2>Security & Password</h2>
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
              style={{ marginTop: '24px' }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                <ShieldAlert size={14} />
                Update Password
              </span>
            </motion.button>
          </form>
        </motion.div>

        {/* Notifications Card */}
        <motion.div
          className="settings-card-premium"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3 * 0.06 }}
        >
          <h2>Workspace Notifications</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '8px' }}>
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
                  onChange={(e) => {
                    const newNotifs = { ...notifications, [key]: e.target.checked };
                    setNotifications(newNotifs);
                    localStorage.setItem('devflow_notifications', JSON.stringify(newNotifs));
                  }}
                />
                {label}
              </label>
            ))}
          </div>
        </motion.div>

        {/* Language Card */}
        <motion.div
          className="settings-card-premium"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 4 * 0.06 }}
        >
          <h2>Localization</h2>
          <label>Preferred Language</label>
          <select value={language} onChange={(e) => {
            setLanguage(e.target.value);
            localStorage.setItem('devflow_language', e.target.value);
          }}>
            <option>English</option>
            <option>Urdu</option>
            <option>Spanish</option>
            <option>French</option>
          </select>
        </motion.div>

        {/* Logout Card */}
        <motion.div
          className="settings-card-premium logout-card-premium"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 5 * 0.06 }}
        >
          <h2>Account Actions</h2>
          <p className="settings-sublabel">Sign out of your active session on this device.</p>
          <motion.button
            className="btn-logout"
            onClick={handleLogout}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
              <LogOut size={15} />
              Sign Out from DevFlow
            </span>
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}