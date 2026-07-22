import { useState, useEffect } from 'react';
import { statusColumns, priorityOptions } from '@/data/tasksData';

import './Tasks.css';

const emptyForm = {
  title: '',
  description: '',
  priority: 'Medium',
  dueDate: '',
  status: 'Todo',
  labels: '',
  estimatedTime: '',
};

export default function TaskForm({ existingTask, onSave, onClose }) {
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    if (existingTask) {
      setForm({ ...existingTask, labels: existingTask.labels.join(', ') });
    } else {
      setForm(emptyForm);
    }
  }, [existingTask]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title.trim()) return;

    onSave({
      ...form,
      id: existingTask ? existingTask.id : Date.now(),
      labels: form.labels.split(',').map((l) => l.trim()).filter(Boolean),
    });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <h2>{existingTask ? 'Edit Task' : 'New Task'}</h2>

        <form onSubmit={handleSubmit}>
          <label>Title</label>
          <input name="title" value={form.title} onChange={handleChange} placeholder="Task title" />

          <label>Description</label>
          <textarea name="description" value={form.description} onChange={handleChange} rows={3} placeholder="Task description" />

          <div className="form-row">
            <div>
              <label>Priority</label>
              <select name="priority" value={form.priority} onChange={handleChange}>
                {priorityOptions.map((p) => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>
            <div>
              <label>Status</label>
              <select name="status" value={form.status} onChange={handleChange}>
                {statusColumns.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </div>

          <div className="form-row">
            <div>
              <label>Due Date</label>
              <input type="date" name="dueDate" value={form.dueDate} onChange={handleChange} />
            </div>
            <div>
              <label>Estimated Time</label>
              <input name="estimatedTime" value={form.estimatedTime} onChange={handleChange} placeholder="e.g. 3h" />
            </div>
          </div>

          <label>Labels (comma separated)</label>
          <input name="labels" value={form.labels} onChange={handleChange} placeholder="Frontend, Bug" />

          <div className="modal-actions">
            <button type="button" className="btn-secondary" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn-primary">{existingTask ? 'Save Changes' : 'Create Task'}</button>
          </div>
        </form>
      </div>
    </div>
  );
}