import { useState, useEffect } from 'react';
import { severityOptions, bugStatusOptions } from '../../data/bugsData';
import './Bugs.css';

const emptyForm = {
  title: '',
  description: '',
  severity: 'Medium',
  stepsToReproduce: '',
  screenshot: null,
  assignedDeveloper: '',
  status: 'Open',
  dateReported: '',
};

export default function BugForm({ existingBug, onSave, onClose }) {
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    if (existingBug) {
      setForm(existingBug);
    } else {
      setForm({ ...emptyForm, dateReported: new Date().toISOString().split('T')[0] });
    }
  }, [existingBug]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setForm({ ...form, screenshot: reader.result });
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title.trim()) return;

    onSave({
      ...form,
      id: existingBug ? existingBug.id : Date.now(),
    });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <h2>{existingBug ? 'Edit Bug' : 'Report New Bug'}</h2>

        <form onSubmit={handleSubmit}>
          <label>Title</label>
          <input name="title" value={form.title} onChange={handleChange} placeholder="Bug title" />

          <label>Description</label>
          <textarea name="description" value={form.description} onChange={handleChange} rows={2} placeholder="What went wrong?" />

          <label>Steps to Reproduce</label>
          <textarea name="stepsToReproduce" value={form.stepsToReproduce} onChange={handleChange} rows={3} placeholder="1. Go to...&#10;2. Click...&#10;3. See error" />

          <div className="form-row">
            <div>
              <label>Severity</label>
              <select name="severity" value={form.severity} onChange={handleChange}>
                {severityOptions.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label>Status</label>
              <select name="status" value={form.status} onChange={handleChange}>
                {bugStatusOptions.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </div>

          <div className="form-row">
            <div>
              <label>Assigned Developer</label>
              <input name="assignedDeveloper" value={form.assignedDeveloper} onChange={handleChange} placeholder="Name" />
            </div>
            <div>
              <label>Date Reported</label>
              <input type="date" name="dateReported" value={form.dateReported} onChange={handleChange} />
            </div>
          </div>

          <label>Screenshot</label>
          <input type="file" accept="image/*" onChange={handleFileChange} />
          {form.screenshot && (
            <img src={form.screenshot} alt="Preview" className="screenshot-preview" />
          )}

          <div className="modal-actions">
            <button type="button" className="btn-secondary" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn-primary">{existingBug ? 'Save Changes' : 'Report Bug'}</button>
          </div>
        </form>
      </div>
    </div>
  );
}