import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard, FolderKanban, ListTodo, Bug, StickyNote, Code2,
  Plug, GitBranch, Clock, CalendarDays, BarChart3, Settings, Sparkles,
} from 'lucide-react';
import './Sidebar.css';

const links = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/projects', label: 'Projects', icon: FolderKanban },
  { to: '/tasks', label: 'Tasks', icon: ListTodo },
  { to: '/bugs', label: 'Bugs', icon: Bug },
  { to: '/notes', label: 'Notes', icon: StickyNote },
  { to: '/snippets', label: 'Snippets', icon: Code2 },
  { to: '/apis', label: 'API Collection', icon: Plug },
  { to: '/github', label: 'GitHub', icon: GitBranch },
  { to: '/time-tracker', label: 'Time Tracker', icon: Clock },
  { to: '/calendar', label: 'Calendar', icon: CalendarDays },
  { to: '/analytics', label: 'Analytics', icon: BarChart3 },
  { to: '/settings', label: 'Settings', icon: Settings },
];

export default function Sidebar({ isOpen, onClose }) {
  return (
    <>
      {isOpen && <div className="sidebar-backdrop" onClick={onClose} />}

      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-brand">
          <Sparkles size={18} />
          <span>DevFlow</span>
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
      </aside>
    </>
  );
}
