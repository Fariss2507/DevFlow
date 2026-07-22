import { useState, useEffect } from 'react';
import BugCard from './BugCard';
import BugForm from './BugForm';
import api from '../../services/api';
import './Bugs.css';

export default function Bugs() {
  const [bugs, setBugs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingBug, setEditingBug] = useState(null);

  useEffect(() => {
    fetchBugs();
  }, []);

  const fetchBugs = async () => {
    try {
      const res = await api.get('/bugs');

      const mapped = res.data.map((bug) => ({
        ...bug,
        id: bug._id,
      }));

      setBugs(mapped);
    } catch (err) {
      console.error('Failed to fetch bugs', err);
    } finally {
      setLoading(false);
    }
  };

  const openNewForm = () => {
    setEditingBug(null);
    setShowForm(true);
  };

  const openEditForm = (bug) => {
    setEditingBug(bug);
    setShowForm(true);
  };

  const handleSave = async (bug) => {
    try {
      if (editingBug) {
        const res = await api.put(`/bugs/${editingBug.id}`, bug);

        const updated = {
          ...res.data,
          id: res.data._id,
        };

        setBugs(
          bugs.map((b) =>
            b.id === updated.id ? updated : b
          )
        );
      } else {
        const res = await api.post('/bugs', bug);

        const created = {
          ...res.data,
          id: res.data._id,
        };

        setBugs([created, ...bugs]);
      }

      setShowForm(false);
    } catch (err) {
      console.error('Failed to save bug', err);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this bug report?')) return;

    try {
      await api.delete(`/bugs/${id}`);

      setBugs(
        bugs.filter((b) => b.id !== id)
      );
    } catch (err) {
      console.error('Failed to delete bug', err);
    }
  };

  if (loading) {
    return (
      <div className="page">
        <h1>Bug Tracker</h1>
        <p className="empty-state">
          Loading bug reports...
        </p>
      </div>
    );
  }
    return (
    <div className="page">

      <div className="page-header">
        <h1>Bug Tracker</h1>

        <button
          className="btn-primary"
          onClick={openNewForm}
        >
          + Report Bug
        </button>
      </div>

      {bugs.length === 0 ? (
        <div className="empty-state">
          <h3>No bugs reported 🎉</h3>
          <p>
            Everything looks stable. Report your first issue
            whenever you find one.
          </p>
        </div>
      ) : (
        <div className="bugs-list">
          {bugs.map((bug) => (
            <BugCard
              key={bug.id}
              bug={bug}
              onEdit={openEditForm}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      {showForm && (
        <BugForm
          existingBug={editingBug}
          onSave={handleSave}
          onClose={() => setShowForm(false)}
        />
      )}

    </div>
  );
}