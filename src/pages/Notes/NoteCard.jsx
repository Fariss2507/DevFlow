import ReactMarkdown from 'react-markdown';
import './Notes.css';

const categoryColors = {
  'Meeting Notes': 'var(--color-primary)',
  Research: 'var(--color-accent)',
  Documentation: '#d97706',
  Ideas: 'var(--color-primary-dark)',
};

export default function NoteCard({ note, onEdit, onDelete }) {
  return (
    <div className="note-card premium-card" onClick={() => onEdit(note)}>
      <div className="note-card-top">
        <span
          className="category-badge"
          style={{ background: categoryColors[note.category] || '#9ca3af' }}
        >
          {note.category}
        </span>
        <button
          className="note-delete-btn"
          onClick={(e) => {
            e.stopPropagation();
            onDelete(note.id);
          }}
        >
          ✕
        </button>
      </div>

      <h3>{note.title}</h3>

      <div className="note-preview">
        <ReactMarkdown>{note.content}</ReactMarkdown>
      </div>

      <div className="note-date">📅 {note.date}</div>
    </div>
  );
}