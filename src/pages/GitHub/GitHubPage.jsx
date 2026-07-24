import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import RepoCard from './RepoCard';
import RepoForm from './RepoForm';
import api from '@/services/api';

import './GitHub.css';

export default function GitHubPage() {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingRepo, setEditingRepo] = useState(null);

  useEffect(() => {
    fetchRepos();
  }, []);

  const fetchRepos = async () => {
    try {
      const res = await api.get('/repos');
      const mapped = res.data.map((r) => ({ ...r, id: r._id }));
      setRepos(mapped);
    } catch (err) {
      console.error('Failed to fetch repos', err);
    } finally {
      setLoading(false);
    }
  };

  const openNewForm = () => {
    setEditingRepo(null);
    setShowForm(true);
  };

  const openEditForm = (repo) => {
    setEditingRepo(repo);
    setShowForm(true);
  };

  const handleSave = async (repo) => {
    try {
      if (editingRepo) {
        const res = await api.put(`/repos/${editingRepo.id}`, repo);
        const updated = { ...res.data, id: res.data._id };
        setRepos(repos.map((r) => (r.id === updated.id ? updated : r)));
      } else {
        const res = await api.post('/repos', repo);
        const created = { ...res.data, id: res.data._id };
        setRepos([...repos, created]);
      }
      setShowForm(false);
    } catch (err) {
      console.error('Failed to save repo', err);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Unlink this repository?')) return;
    try {
      await api.delete(`/repos/${id}`);
      setRepos(repos.filter((r) => r.id !== id));
    } catch (err) {
      console.error('Failed to delete repo', err);
    }
  };

  if (loading) {
    return (
      <div className="page">
        <h1>GitHub Integration</h1>
        <p className="empty-state">Loading repositories...</p>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="page-header">
        <h1>GitHub Integration</h1>
        <motion.button
          className="btn-primary"
          onClick={openNewForm}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          + Link Repository
        </motion.button>
      </div>

      {repos.length === 0 ? (
        <motion.p
          className="empty-state"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          No repositories linked yet.
        </motion.p>
      ) : (
        <div className="repos-list">
          <AnimatePresence>
            {repos.map((repo, index) => (
              <motion.div
                key={repo.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3, delay: index * 0.06 }}
              >
                <RepoCard repo={repo} onEdit={openEditForm} onDelete={handleDelete} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      <AnimatePresence>
        {showForm && (
          <RepoForm existingRepo={editingRepo} onSave={handleSave} onClose={() => setShowForm(false)} />
        )}
      </AnimatePresence>
    </div>
  );
}