import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, FolderKanban, ListTodo, Bug, StickyNote, Code2,
  Plug, GitBranch, Clock, CalendarDays, BarChart3, Settings, Sparkles,
  FolderArchive, BookOpen, Rocket, Database, User, ShieldAlert,
  Sun, Moon, LogOut
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useThemeStore } from '@/store/themeStore';
import DevFlowLogo from './DevFlowLogo';
import './Sidebar.css';

const links = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/ai-workspace', label: 'AI Workspace', icon: Sparkles },
  { to: '/projects', label: 'Projects', icon: FolderKanban },
  { to: '/tasks', label: 'Tasks', icon: ListTodo },
  { to: '/bugs', label: 'Bugs', icon: Bug },
  { to: '/file-manager', label: 'File Manager', icon: FolderArchive },
  { to: '/docs', label: 'Documentation', icon: BookOpen },
  { to: '/notes', label: 'Notes', icon: StickyNote },
  { to: '/snippets', label: 'Snippets', icon: Code2 },
  { to: '/apis', label: 'API Collection', icon: Plug },
  { to: '/github', label: 'GitHub', icon: GitBranch },
  { to: '/deployments', label: 'Deployments', icon: Rocket },
  { to: '/db-explorer', label: 'DB Explorer', icon: Database },
  { to: '/time-tracker', label: 'Time Tracker', icon: Clock },
  { to: '/calendar', label: 'Calendar', icon: CalendarDays },
  { to: '/analytics', label: 'Analytics', icon: BarChart3 },
  { to: '/profile', label: 'Profile', icon: User },
  { to: '/admin', label: 'Admin Panel', icon: ShieldAlert },
  { to: '/settings', label: 'Settings', icon: Settings },
];

export default function Sidebar({ isOpen, onClose }) {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useThemeStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <>
      {isOpen && <div className="sidebar-backdrop" onClick={onClose} />}

      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-brand" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <DevFlowLogo size={30} />
          <span style={{ fontSize: '1.25rem', fontWeight: '800' }}>DevForge AI</span>
        </div>

        <nav>
          <ul>
            {links.map((link) => {
              const Icon = link.icon;
              return (
                <li key={link.to}>
                  <NavLink
                    to={link.to}
                    onClick={onClose}
                    className={({ isActive }) => (isActive ? 'active' : '')}
                  >
                    <Icon size={17} strokeWidth={2} />
                    <span>{link.label}</span>
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </nav>

        {user && (
          <div className="sidebar-footer">
            <div className="sidebar-user-card">
              <div className="user-avatar">
                {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
              </div>
              <div className="user-info">
                <span className="user-name">{user.name || 'User'}</span>
                <span className="user-email">{user.email}</span>
              </div>
              
              <div className="user-actions">
                <button 
                  className="icon-btn theme-toggle" 
                  onClick={toggleTheme}
                  title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
                >
                  {theme === 'light' ? <Moon size={14} /> : <Sun size={14} />}
                </button>
                <button 
                  className="icon-btn logout-btn" 
                  onClick={handleLogout}
                  title="Logout"
                >
                  <LogOut size={14} />
                </button>
              </div>
            </div>
          </div>
        )}
      </aside>
    </>
  );
}
