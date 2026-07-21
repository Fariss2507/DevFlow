import { useState, useMemo } from 'react';
import NoteCard from './NoteCard';
import NoteForm from './NoteForm';
import { initialNotes, noteCategories } from '../../data/notesData';
import './Notes.css';

export default function Notes() {
  const [notes, setNotes] = useState(initialNotes);
  const [showForm, setShowForm] = useState(false);
  const [editingNote, setEditingNote] = useState(null);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');

  const openNewForm = () => {
    setEditingNote(null);
    setShowForm(true);
  };

  const openEditForm = (note) => {
    setEditingNote(note);
    setShowForm(true);
  };

  const handleSave = (note) => {
    if (editingNote) {
      setNotes(notes.map((n) => (n.id === note.id ? note : n)));
    } else {
      setNotes([...notes, note]);
    }
    setShowForm(false);
  };

  const handleDelete = (id) => {
    if (confirm('Delete this note?')) {
      setNotes(notes.filter((n) => n.id !== id));
    }
  };

  const filteredNotes = useMemo(() => {
    return notes.filter((note) => {
      const matchesSearch =
        note.title.toLowerCase().includes(search.toLowerCase()) ||
        note.content.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = categoryFilter === 'All' || note.category === categoryFilter;
      return matchesSearch && matchesCategory;
    });
  }, [notes, search, categoryFilter]);

  return (
    <div className="page">
      <div className="page-header">
        <h1>Notes</h1>
        <button className="btn-primary" onClick={openNewForm}>+ New Note</button>
      </div>

      <div className="notes-toolbar">
        <input
          type="text"
          className="notes-search"
          placeholder="🔍 Search notes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="category-filters">
          <button
            className={`filter-chip ${categoryFilter === 'All' ? 'active' : ''}`}
            onClick={() => setCategoryFilter('All')}
          >
            All
          </button>
          {noteCategories.map((cat) => (
            <button
              key={cat}
              className={`filter-chip ${categoryFilter === cat ? 'active' : ''}`}
              onClick={() => setCategoryFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {filteredNotes.length === 0 ? (
        <p className="empty-state">No notes found.</p>
      ) : (
        <div className="notes-grid">
          {filteredNotes.map((note) => (
            <NoteCard key={note.id} note={note} onEdit={openEditForm} onDelete={handleDelete} />
          ))}
        </div>
      )}

      {showForm && (
        <NoteForm existingNote={editingNote} onSave={handleSave} onClose={() => setShowForm(false)} />
      )}
    </div>
  );
}