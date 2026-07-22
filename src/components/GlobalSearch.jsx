import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../services/api';
import './GlobalSearch.css';

const typeIcons = {
  Project: '📁',
  Task: '📝',
  Bug: '🐞',
  Note: '📄',
  Snippet: '💻',
};

export default function GlobalSearch() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(true);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (query.trim()) {
        api
          .get(`/search?q=${encodeURIComponent(query)}`)
          .then((res) => setResults(res.data))
          .catch((err) => console.error('Search failed', err));
      } else {
        setResults([]);
      }
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [query]);

  const handleSelect = (link) => {
    navigate(link);
    setIsOpen(false);
    setQuery('');
  };

  return (
    <>
      <button className="search-trigger" onClick={() => setIsOpen(true)}>
        🔍 Search
        <span className="search-kbd">Ctrl+K</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="search-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              className="search-modal"
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, y: -20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.98 }}
              transition={{ duration: 0.2 }}
            >
              <input
                ref={inputRef}
                type="text"
                className="search-input"
                placeholder="Search projects, tasks, bugs, notes, snippets..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />

              <div className="search-results">
                {query.trim() === '' ? (
                  <p className="search-hint">Type to search across DevFlow</p>
                ) : results.length === 0 ? (
                  <p className="search-hint">No results found for "{query}"</p>
                ) : (
                  results.map((r) => (
                    <div
                      className="search-result-item"
                      key={`${r.type}-${r.id}`}
                      onClick={() => handleSelect(r.link)}
                    >
                      <span className="result-icon">{typeIcons[r.type]}</span>
                      <div className="result-text">
                        <span className="result-title">{r.title}</span>
                        <span className="result-subtitle">{r.type} · {r.subtitle}</span>
                      </div>
                      <span className="result-arrow">→</span>
                    </div>
                  ))
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}