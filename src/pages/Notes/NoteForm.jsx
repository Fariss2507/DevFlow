import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { noteCategories } from '../../data/notesData';
import './Notes.css';

const emptyForm = {
  title: '',
  content: '',
  category: 'Ideas',
  date: '',
};

export default function NoteForm({ existingNote, onSave, onClose }) {
  const [form, setForm] = useState(emptyForm);
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    if (existingNote) {
      setForm(existingNote);
    } else {
      setForm({ ...emptyForm, date: new Date().toISOString().split('T')[0] });
    }
  }, [existingNote]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title.trim()) return;

    onSave({
      ...form,
      id: existingNote ? existingNote.id : Date.now(),
    });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card note-modal" onClick={(e) => e.stopPropagation()}>
        <h2>{existingNote ? 'Edit Note' : 'New Note'}</h2>

        <form onSubmit={handleSubmit}>
          <label>Title</label>
          <input name="title" value={form.title} onChange={handleChange} placeholder="Note title" />

          <div className="form-row">
            <div>
              <label>Category</label>
              <select name="category" value={form.category} onChange={handleChange}>
                {noteCategories.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label>Date</label>
              <input type="date" name="date" value={form.date} onChange={handleChange} />
            </div>
          </div>

          <div className="note-editor-header">
            <label style={{ margin: 0 }}>Content (Markdown supported)</label>
            <button
              type="button"
              className="btn-secondary btn-tiny"
              onClick={() => setShowPreview(!showPreview)}
            >
              {showPreview ? 'Edit' : 'Preview'}
            </button>
          </div>

          {showPreview ? (
            <div className="markdown-preview-box">
              <ReactMarkdown>{form.content || '*Nothing to preview yet*'}</ReactMarkdown>
            </div>
          ) : (
            <textarea
              name="content"
              value={form.content}
              onChange={handleChange}
              rows={8}
              placeholder="Write your note in markdown... **bold**, ## headings, - lists"
            />
          )}

          <div className="modal-actions">
            <button type="button" className="btn-secondary" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn-primary">{existingNote ? 'Save Changes' : 'Create Note'}</button>
          </div>
        </form>
      </div>
    </div>
  );
}