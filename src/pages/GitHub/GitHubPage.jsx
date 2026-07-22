import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import RepoCard from './RepoCard';
import RepoForm from './RepoForm';
import api from '../../services/api';
import './GitHub.css';

const pageVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.35,
    },
  },
};

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
      const res = await api.get('/github');

      const mapped = res.data.map((repo) => ({
        ...repo,
        id: repo._id,
      }));

      setRepos(mapped);
    } catch (err) {
      console.error('Failed to fetch repositories', err);
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
        const res = await api.put(
          `/github/${editingRepo.id}`,
          repo
        );

        const updated = {
          ...res.data,
          id: res.data._id,
        };

        setRepos(
          repos.map((r) =>
            r.id === updated.id ? updated : r
          )
        );
      } else {
        const res = await api.post('/github', repo);

        const created = {
          ...res.data,
          id: res.data._id,
        };

        setRepos([created, ...repos]);
      }

      setShowForm(false);
      setEditingRepo(null);
    } catch (err) {
      console.error('Failed to save repository', err);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Unlink this repository?')) return;

    try {
      await api.delete(`/github/${id}`);

      setRepos(
        repos.filter((r) => r.id !== id)
      );
    } catch (err) {
      console.error('Failed to delete repository', err);
    }
  };

  if (loading) {
    return (
      <div className="page">
        <h1>GitHub Integration</h1>
        <p className="empty-state">
          Loading repositories...
        </p>
      </div>
    );
  }
    return (
    <motion.div
      className="page"
      variants={pageVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div
        className="page-header"
        variants={itemVariants}
      >
        <h1>GitHub Integration</h1>

        <button
          className="btn-primary"
          onClick={openNewForm}
        >
          + Link Repository
        </button>
      </motion.div>

      {repos.length === 0 ? (
        <motion.div
          className="empty-state"
          variants={itemVariants}
        >
          <h3>No repositories linked 📦</h3>

          <p>
            Link your GitHub repositories to
            manage them from DevFlow.
          </p>
        </motion.div>
      ) : (
        <motion.div
          className="repos-list"
          variants={itemVariants}
        >
          {repos.map((repo) => (
            <motion.div
              key={repo.id}
              variants={itemVariants}
              whileHover={{
                y: -4,
                scale: 1.01,
              }}
            >
              <RepoCard
                repo={repo}
                onEdit={openEditForm}
                onDelete={handleDelete}
              />
            </motion.div>
          ))}
        </motion.div>
      )}

      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <RepoForm
              existingRepo={editingRepo}
              onSave={handleSave}
              onClose={() => {
                setShowForm(false);
                setEditingRepo(null);
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}