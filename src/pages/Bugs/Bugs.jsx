import { useState } from 'react';
import BugCard from './BugCard';
import BugForm from './BugForm';
import { initialBugs } from '../../data/bugsData';
import './Bugs.css';

export default function Bugs() {
  const [bugs, setBugs] = useState(initialBugs);
  const [showForm, setShowForm] = useState(false);
  const [editingBug, setEditingBug] = useState(null);

  const openNewForm = () => {
    setEditingBug(null);
    setShowForm(true);
  };

  const openEditForm = (bug) => {
    setEditingBug(bug);
    setShowForm(true);
  };

  const handleSave = (bug) => {
    if (editingBug) {
      setBugs(bugs.map((b) => (b.id === bug.id ? bug : b)));
    } else {
      setBugs([...bugs, bug]);
    }
    setShowForm(false);
  };

  const handleDelete = (id) => {
    if (confirm('Delete this bug report?')) {
      setBugs(bugs.filter((b) => b.id !== id));
    }
  };

  return (
    <div className="page">
      <div className="page-header">
        <h1>Bug Tracker</h1>
        <button className="btn-primary" onClick={openNewForm}>+ Report Bug</button>
      </div>

      {bugs.length === 0 ? (
        <p className="empty-state">No bugs reported. Great job! 🎉</p>
      ) : (
        <div className="bugs-list">
          {bugs.map((bug) => (
            <BugCard key={bug.id} bug={bug} onEdit={openEditForm} onDelete={handleDelete} />
          ))}
        </div>
      )}

      {showForm && (
        <BugForm existingBug={editingBug} onSave={handleSave} onClose={() => setShowForm(false)} />
      )}
    </div>
  );
}