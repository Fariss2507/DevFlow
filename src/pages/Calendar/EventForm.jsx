import { useState } from 'react';
import { motion } from 'framer-motion';
import { eventTypes } from '@/data/calendarData';

import './Calendar.css';

export default function EventForm({ defaultDate, onSave, onClose }) {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState(defaultDate || '');
  const [type, setType] = useState('Task');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !date) return;
    onSave({ id: Date.now(), title, date, type });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <motion.div
        className="modal-card"
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.2 }}
      >
        <h2>New Event</h2>
        <form onSubmit={handleSubmit}>
          <label>Title</label>
          <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Event title" />

          <div className="form-row">
            <div>
              <label>Date</label>
              <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
            </div>
            <div>
              <label>Type</label>
              <select value={type} onChange={(e) => setType(e.target.value)}>
                {eventTypes.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
          </div>

          <div className="modal-actions">
            <button type="button" className="btn-secondary" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn-primary">Add Event</button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}