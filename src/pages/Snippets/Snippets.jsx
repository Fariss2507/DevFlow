import { useState, useMemo } from 'react';
import SnippetCard from './SnippetCard';
import SnippetForm from './SnippetForm';
import { initialSnippets } from '../../data/snippetsData';
import './Snippets.css';

export default function Snippets() {
  const [snippets, setSnippets] = useState(initialSnippets);
  const [showForm, setShowForm] = useState(false);
  const [editingSnippet, setEditingSnippet] = useState(null);
  const [search, setSearch] = useState('');
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  const openNewForm = () => {
    setEditingSnippet(null);
    setShowForm(true);
  };

  const openEditForm = (snippet) => {
    setEditingSnippet(snippet);
    setShowForm(true);
  };

  const handleSave = (snippet) => {
    if (editingSnippet) {
      setSnippets(snippets.map((s) => (s.id === snippet.id ? snippet : s)));
    } else {
      setSnippets([...snippets, snippet]);
    }
    setShowForm(false);
  };

  const handleDelete = (id) => {
    if (confirm('Delete this snippet?')) {
      setSnippets(snippets.filter((s) => s.id !== id));
    }
  };

  const handleToggleFavorite = (id) => {
    setSnippets(snippets.map((s) => (s.id === id ? { ...s, favorite: !s.favorite } : s)));
  };

  const filteredSnippets = useMemo(() => {
    return snippets.filter((s) => {
      const matchesSearch =
        s.title.toLowerCase().includes(search.toLowerCase()) ||
        s.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));
      const matchesFavorite = !showFavoritesOnly || s.favorite;
      return matchesSearch && matchesFavorite;
    });
  }, [snippets, search, showFavoritesOnly]);

  return (
    <div className="page">
      <div className="page-header">
        <h1>Code Snippets</h1>
        <button className="btn-primary" onClick={openNewForm}>+ New Snippet</button>
      </div>

      <div className="notes-toolbar">
        <input
          type="text"
          className="notes-search"
          placeholder="🔍 Search by title or tag..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button
          className={`filter-chip ${showFavoritesOnly ? 'active' : ''}`}
          onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
        >
          ★ Favorites only
        </button>
      </div>

      {filteredSnippets.length === 0 ? (
        <p className="empty-state">No snippets found.</p>
      ) : (
        <div className="snippets-grid">
          {filteredSnippets.map((snippet) => (
            <SnippetCard
              key={snippet.id}
              snippet={snippet}
              onEdit={openEditForm}
              onDelete={handleDelete}
              onToggleFavorite={handleToggleFavorite}
            />
          ))}
        </div>
      )}

      {showForm && (
        <SnippetForm
          existingSnippet={editingSnippet}
          onSave={handleSave}
          onClose={() => setShowForm(false)}
        />
      )}
    </div>
  );
}