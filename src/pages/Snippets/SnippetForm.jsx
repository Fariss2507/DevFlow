import { useState, useEffect } from 'react';
import { languageOptions } from '@/data/snippetsData';

import './Snippets.css';

const emptyForm = {
  title: '',
  language: 'javascript',
  description: '',
  code: '',
  tags: '',
  favorite: false,
};

export default function SnippetForm({ existingSnippet, onSave, onClose }) {
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    if (existingSnippet) {
      setForm({ ...existingSnippet, tags: existingSnippet.tags.join(', ') });
    } else {
      setForm(emptyForm);
    }
  }, [existingSnippet]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.code.trim()) return;

    onSave({
      ...form,
      id: existingSnippet ? existingSnippet.id : Date.now(),
      tags: form.tags.split(',').map((t) => t.trim()).filter(Boolean),
    });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <h2>{existingSnippet ? 'Edit Snippet' : 'New Snippet'}</h2>

        <form onSubmit={handleSubmit}>
          <label>Title</label>
          <input name="title" value={form.title} onChange={handleChange} placeholder="Snippet title" />

          <div className="form-row">
            <div>
              <label>Language</label>
              <select name="language" value={form.language} onChange={handleChange}>
                {languageOptions.map((l) => <option key={l} value={l}>{l}</option>)}
              </select>
            </div>
            <div>
              <label>Tags (comma separated)</label>
              <input name="tags" value={form.tags} onChange={handleChange} placeholder="utility, api" />
            </div>
          </div>

          <label>Description</label>
          <input name="description" value={form.description} onChange={handleChange} placeholder="What does this snippet do?" />

          <label>Code</label>
          <textarea
            name="code"
            value={form.code}
            onChange={handleChange}
            rows={8}
            className="code-textarea"
            placeholder="Paste your code here..."
          />

          <label className="auth-checkbox" style={{ marginTop: 'var(--spacing-md)' }}>
            <input type="checkbox" name="favorite" checked={form.favorite} onChange={handleChange} />
            Mark as favorite
          </label>

          <div className="modal-actions">
            <button type="button" className="btn-secondary" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn-primary">{existingSnippet ? 'Save Changes' : 'Create Snippet'}</button>
          </div>
        </form>
      </div>
    </div>
  );
}