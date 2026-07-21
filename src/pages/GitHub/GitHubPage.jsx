import { useState } from 'react';
import RepoCard from './RepoCard';
import RepoForm from './RepoForm';
import { initialRepos } from '../../data/githubData';
import './GitHub.css';

export default function GitHubPage() {
  const [repos, setRepos] = useState(initialRepos);
  const [showForm, setShowForm] = useState(false);
  const [editingRepo, setEditingRepo] = useState(null);

  const openNewForm = () => {
    setEditingRepo(null);
    setShowForm(true);
  };

  const openEditForm = (repo) => {
    setEditingRepo(repo);
    setShowForm(true);
  };

  const handleSave = (repo) => {
    if (editingRepo) {
      setRepos(repos.map((r) => (r.id === repo.id ? repo : r)));
    } else {
      setRepos([...repos, repo]);
    }
    setShowForm(false);
  };

  const handleDelete = (id) => {
    if (confirm('Unlink this repository?')) {
      setRepos(repos.filter((r) => r.id !== id));
    }
  };

  return (
    <div className="page">
      <div className="page-header">
        <h1>GitHub Integration</h1>
        <button className="btn-primary" onClick={openNewForm}>+ Link Repository</button>
      </div>

      {repos.length === 0 ? (
        <p className="empty-state">No repositories linked yet.</p>
      ) : (
        <div className="repos-list">
          {repos.map((repo) => (
            <RepoCard key={repo.id} repo={repo} onEdit={openEditForm} onDelete={handleDelete} />
          ))}
        </div>
      )}

      {showForm && (
        <RepoForm existingRepo={editingRepo} onSave={handleSave} onClose={() => setShowForm(false)} />
      )}
    </div>
  );
}