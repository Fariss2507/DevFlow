import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SnippetCard from './SnippetCard';
import SnippetForm from './SnippetForm';
import api from '../../services/api';
import './Snippets.css';

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
    y: 25,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.35,
    },
  },
};

export default function Snippets() {
  const [snippets, setSnippets] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showForm, setShowForm] = useState(false);
  const [editingSnippet, setEditingSnippet] = useState(null);

  const [search, setSearch] = useState('');
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  useEffect(() => {
    fetchSnippets();
  }, []);

  const fetchSnippets = async () => {
    try {
      const res = await api.get('/snippets');

      const mapped = res.data.map((snippet) => ({
        ...snippet,
        id: snippet._id,
      }));

      setSnippets(mapped);
    } catch (err) {
      console.error('Failed to fetch snippets', err);
    } finally {
      setLoading(false);
    }
  };

  const openNewForm = () => {
    setEditingSnippet(null);
    setShowForm(true);
  };

  const openEditForm = (snippet) => {
    setEditingSnippet(snippet);
    setShowForm(true);
  };
    const handleSave = async (snippet) => {
    try {
      if (editingSnippet) {
        const res = await api.put(
          `/snippets/${editingSnippet.id}`,
          snippet
        );

        const updated = {
          ...res.data,
          id: res.data._id,
        };

        setSnippets(
          snippets.map((s) =>
            s.id === updated.id ? updated : s
          )
        );
      } else {
        const res = await api.post('/snippets', snippet);

        const created = {
          ...res.data,
          id: res.data._id,
        };

        setSnippets([created, ...snippets]);
      }

      setShowForm(false);
      setEditingSnippet(null);
    } catch (err) {
      console.error('Failed to save snippet', err);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this snippet?')) return;

    try {
      await api.delete(`/snippets/${id}`);

      setSnippets(
        snippets.filter((s) => s.id !== id)
      );
    } catch (err) {
      console.error('Failed to delete snippet', err);
    }
  };

  const handleToggleFavorite = async (id) => {
    const snippet = snippets.find((s) => s.id === id);

    if (!snippet) return;

    try {
      const res = await api.put(`/snippets/${id}`, {
        ...snippet,
        favorite: !snippet.favorite,
      });

      const updated = {
        ...res.data,
        id: res.data._id,
      };

      setSnippets(
        snippets.map((s) =>
          s.id === updated.id ? updated : s
        )
      );
    } catch (err) {
      console.error('Failed to update favorite', err);
    }
  };

  const filteredSnippets = useMemo(() => {
    return snippets.filter((snippet) => {

      const matchesSearch =
        snippet.title
          .toLowerCase()
          .includes(search.toLowerCase()) ||

        snippet.tags.some((tag) =>
          tag
            .toLowerCase()
            .includes(search.toLowerCase())
        );

      const matchesFavorite =
        !showFavoritesOnly ||
        snippet.favorite;

      return matchesSearch && matchesFavorite;
    });
  }, [
    snippets,
    search,
    showFavoritesOnly,
  ]);

  if (loading) {
    return (
      <div className="page">
        <h1>Code Snippets</h1>

        <p className="empty-state">
          Loading snippets...
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
        <h1>Code Snippets</h1>

        <button
          className="btn-primary"
          onClick={openNewForm}
        >
          + New Snippet
        </button>
      </motion.div>

      <motion.div
        className="notes-toolbar"
        variants={itemVariants}
      >

        <input
          type="text"
          className="notes-search"
          placeholder="🔍 Search by title or tag..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

        <button
          className={`filter-chip ${
            showFavoritesOnly
              ? 'active'
              : ''
          }`}
          onClick={() =>
            setShowFavoritesOnly(
              !showFavoritesOnly
            )
          }
        >
          ★ Favorites only
        </button>

      </motion.div>

      {filteredSnippets.length === 0 ? (

        <motion.div
          className="empty-state"
          variants={itemVariants}
        >
          <h3>No snippets found 💻</h3>

          <p>
            Create your first code snippet
            or change your search.
          </p>
        </motion.div>

      ) : (

        <motion.div
          className="snippets-grid"
          variants={itemVariants}
        >
                    {filteredSnippets.map((snippet) => (

            <motion.div
              key={snippet.id}
              variants={itemVariants}
              whileHover={{
                y: -6,
                scale: 1.02,
              }}
              transition={{
                duration: 0.2,
              }}
            >

              <SnippetCard
                snippet={snippet}
                onEdit={openEditForm}
                onDelete={handleDelete}
                onToggleFavorite={
                  handleToggleFavorite
                }
              />

            </motion.div>

          ))}
        </motion.div>

      )}

      <AnimatePresence>

        {showForm && (

          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            transition={{
              duration: 0.25,
            }}
          >

            <SnippetForm
              existingSnippet={editingSnippet}
              onSave={handleSave}
              onClose={() => {
                setShowForm(false);
                setEditingSnippet(null);
              }}
            />

          </motion.div>

        )}

      </AnimatePresence>

    </motion.div>
  );
}
      