import { useState } from 'react';
import { Menu, Sparkles, ChevronDown, LogOut, Settings as SettingsIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { GlobalSearch, NotificationBell } from '@/components/features';
import './Navbar.css';

export default function Navbar({ onMenuClick }) {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const initials = (user?.name || 'U').charAt(0).toUpperCase();

  const handleLogout = () => {
    logout();
    setShowProfileMenu(false);
    navigate('/login');
  };

  return (
    <header className="navbar">
      <div className="navbar-left">
        <button className="hamburger-btn" onClick={onMenuClick}>
          <Menu size={20} />
        </button>
        <div className="navbar-logo">
          <Sparkles size={18} />
          <span>DevFlow</span>
        </div>
      </div>

      <GlobalSearch />

      <div className="navbar-actions">
        <NotificationBell />

        <div className="profile-menu-wrap">
          <button className="profile-trigger" onClick={() => setShowProfileMenu(!showProfileMenu)}>
            <span className="avatar-circle">{initials}</span>
            <ChevronDown size={14} />
          </button>

          {showProfileMenu && (
            <>
              <div className="profile-backdrop" onClick={() => setShowProfileMenu(false)} />
              <div className="profile-dropdown">
                <div className="profile-dropdown-header">
                  <span className="avatar-circle lg">{initials}</span>
                  <div>
                    <div className="profile-name">{user?.name || 'User'}</div>
                    <div className="profile-email">{user?.email || ''}</div>
                  </div>
                </div>
                <button
                  className="profile-dropdown-item"
                  onClick={() => { navigate('/settings'); setShowProfileMenu(false); }}
                >
                  <SettingsIcon size={15} /> Settings
                </button>
                <button className="profile-dropdown-item danger" onClick={handleLogout}>
                  <LogOut size={15} /> Log Out
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
