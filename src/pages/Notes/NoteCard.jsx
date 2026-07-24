import { motion } from "framer-motion";
import ReactMarkdown from 'react-markdown';
import { Calendar, X } from 'lucide-react';

const categoryClassMap = {
  'Meeting Notes': 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30',
  Research: 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30',
  Documentation: 'bg-sky-500/15 text-sky-600 dark:text-sky-400 border-sky-500/30',
  Ideas: 'bg-violet-500/15 text-violet-600 dark:text-violet-400 border-violet-500/30',
};

const categoryColorStyles = {
  'Meeting Notes': 'var(--color-primary)',
  Research: 'var(--color-pending)',
  Documentation: '#0ea5e9',
  Ideas: '#8b5cf6',
};

export default function NoteCard({ note, onEdit, onDelete }) {
  const noteAccentColor = categoryColorStyles[note.category] || 'var(--color-primary)';
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      onClick={() => onEdit(note)}
      className="note-card-premium"
      style={{ '--color-primary': noteAccentColor }}
    >
      {/* Header */}
      <div className="note-card-header">
        <span className="note-category-tag" style={{ color: noteAccentColor, borderColor: `${noteAccentColor}30`, backgroundColor: `${noteAccentColor}10` }}>
          {note.category}
        </span>
        <button
          className="btn-note-delete"
          onClick={(e) => {
            e.stopPropagation();
            onDelete(note.id);
          }}
          title="Delete Note"
        >
          <X size={13} />
        </button>
      </div>

      {/* Content Preview Block */}
      <div className="note-card-body">
        <h3 className="note-card-title truncate" title={note.title}>{note.title}</h3>
        <div className="note-card-preview prose dark:prose-invert">
          <ReactMarkdown>{note.content}</ReactMarkdown>
        </div>
      </div>

      {/* Date Footer */}
      <div className="note-card-footer font-mono">
        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <Calendar size={12} />
          {note.date}
        </span>
      </div>
    </motion.div>
  );
}