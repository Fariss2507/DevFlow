import { useState, useMemo, useEffect } from 'react';
import NoteCard from './NoteCard';
import NoteForm from './NoteForm';
import { noteCategories } from '../../data/notesData';
import api from '../../services/api';
import './Notes.css';

export default function Notes() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingNote, setEditingNote] = useState(null);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const res = await api.get('/notes');

      const mapped = res.data.map((note) => ({
        ...note,
        id: note._id,
      }));

      setNotes(mapped);
    } catch (err) {
      console.error('Failed to fetch notes', err);
    } finally {
      setLoading(false);
    }
  };

  const openNewForm = () => {
    setEditingNote(null);
    setShowForm(true);
  };

  const openEditForm = (note) => {
    setEditingNote(note);
    setShowForm(true);
  };

  const handleSave = async (note) => {
    try {
      if (editingNote) {
        const res = await api.put(`/notes/${editingNote.id}`, note);

        const updated = {
          ...res.data,
          id: res.data._id,
        };

        setNotes(
          notes.map((n) =>
            n.id === updated.id ? updated : n
          )
        );
      } else {
        const res = await api.post('/notes', note);

        const created = {
          ...res.data,
          id: res.data._id,
        };

        setNotes([created, ...notes]);
      }

      setShowForm(false);
    } catch (err) {
      console.error('Failed to save note', err);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this note?')) return;

    try {
      await api.delete(`/notes/${id}`);

      setNotes(
        notes.filter((n) => n.id !== id)
      );
    } catch (err) {
      console.error('Failed to delete note', err);
    }
  };

  const filteredNotes = useMemo(() => {
    return notes.filter((note) => {
      const matchesSearch =
        note.title.toLowerCase().includes(search.toLowerCase()) ||
        note.content.toLowerCase().includes(search.toLowerCase());

      const matchesCategory =
        categoryFilter === 'All' ||
        note.category === categoryFilter;

      return matchesSearch && matchesCategory;
    });
  }, [notes, search, categoryFilter]);

  if (loading) {
    return (
      <div className="page">
        <h1>Notes</h1>
        <p className="empty-state">Loading notes...</p>
      </div>
    );
  }
    return (
    <div className="page">

      <div className="page-header">
        <h1>Notes</h1>

        <button
          className="btn-primary"
          onClick={openNewForm}
        >
          + New Note
        </button>
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
            className={`filter-chip ${
              categoryFilter === 'All' ? 'active' : ''
            }`}
            onClick={() => setCategoryFilter('All')}
          >
            All
          </button>

          {noteCategories.map((cat) => (
            <button
              key={cat}
              className={`filter-chip ${
                categoryFilter === cat ? 'active' : ''
              }`}
              onClick={() => setCategoryFilter(cat)}
            >
              {cat}
            </button>
          ))}

        </div>

      </div>

      {filteredNotes.length === 0 ? (

        <div className="empty-state">
          <h3>No notes found 📝</h3>
          <p>
            Create your first note or change the search/filter.
          </p>
        </div>

      ) : (

        <div className="notes-grid">
          {filteredNotes.map((note) => (
            <NoteCard
              key={note.id}
              note={note}
              onEdit={openEditForm}
              onDelete={handleDelete}
            />
          ))}
        </div>

      )}

      {showForm && (
        <NoteForm
          existingNote={editingNote}
          onSave={handleSave}
          onClose={() => setShowForm(false)}
        />
      )}

    </div>
  );
}