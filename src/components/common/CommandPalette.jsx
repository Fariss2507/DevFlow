import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Sparkles, FolderPlus, CheckSquare, StickyNote, Settings, Terminal, X } from 'lucide-react';
import './CommandPalette.css';

export default function CommandPalette({ isOpen, onClose }) {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else onClose(true); // toggle
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const actions = [
    { icon: Sparkles, label: 'Open DevForge AI Workspace', action: () => navigate('/ai-workspace') },
    { icon: FolderPlus, label: 'Create New Project', action: () => navigate('/projects') },
    { icon: CheckSquare, label: 'Create New Task', action: () => navigate('/tasks') },
    { icon: StickyNote, label: 'Open Notes', action: () => navigate('/notes') },
    { icon: Terminal, label: 'Open Database Explorer', action: () => navigate('/db-explorer') },
    { icon: Settings, label: 'Open System Settings', action: () => navigate('/settings') },
  ];

  const filtered = actions.filter(a => a.label.toLowerCase().includes(query.toLowerCase()));

  const handleSelect = (actionFn) => {
    actionFn();
    onClose();
  };

  return (
    <div className="cmd-backdrop" onClick={onClose}>
      <div className="cmd-modal glass-card" onClick={e => e.stopPropagation()}>
        <div className="cmd-header">
          <Search size={18} className="cmd-search-icon" />
          <input
            type="text"
            placeholder="Type a command or search... (Press ESC to close)"
            value={query}
            onChange={e => setQuery(e.target.value)}
            autoFocus
          />
          <button className="cmd-close-btn" onClick={onClose}><X size={16} /></button>
        </div>

        <div className="cmd-body">
          <div className="cmd-section-title">Quick Actions & Navigation</div>
          {filtered.length === 0 ? (
            <div className="cmd-empty">No matching commands found.</div>
          ) : (
            filtered.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="cmd-item" onClick={() => handleSelect(item.action)}>
                  <Icon size={16} />
                  <span>{item.label}</span>
                  <span className="cmd-shortcut">Jump</span>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
