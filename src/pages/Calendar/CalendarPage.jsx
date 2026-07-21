import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CalendarGrid from './CalendarGrid';
import EventForm from './EventForm';
import { initialEvents, typeColors } from '../../data/calendarData';
import './Calendar.css';

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState(initialEvents);
  const [selectedDate, setSelectedDate] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const monthLabel = currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  const goPrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const goNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const handleDayClick = (dateStr) => {
    setSelectedDate(dateStr);
  };

  const handleSaveEvent = (event) => {
    setEvents([...events, event]);
    setShowForm(false);
  };

  const handleDeleteEvent = (id) => {
    setEvents(events.filter((e) => e.id !== id));
  };

  const selectedDayEvents = useMemo(
    () => events.filter((e) => e.date === selectedDate),
    [events, selectedDate]
  );

  return (
    <div className="page">
      <div className="page-header">
        <h1>Calendar</h1>
        <button className="btn-primary" onClick={() => setShowForm(true)}>+ New Event</button>
      </div>

      <div className="calendar-layout">
        <div className="calendar-panel">
          <div className="calendar-nav">
            <button className="btn-secondary" onClick={goPrevMonth}>← Prev</button>
            <h2>{monthLabel}</h2>
            <button className="btn-secondary" onClick={goNextMonth}>Next →</button>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={monthLabel}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
            >
              <CalendarGrid
                currentDate={currentDate}
                events={events}
                onDayClick={handleDayClick}
                selectedDate={selectedDate}
              />
            </motion.div>
          </AnimatePresence>

          <div className="calendar-legend">
            {Object.entries(typeColors).map(([type, color]) => (
              <span key={type} className="legend-item">
                <span className="legend-dot" style={{ background: color }} />
                {type}
              </span>
            ))}
          </div>
        </div>

        <motion.div
          className="calendar-sidebar"
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <h3>{selectedDate ? selectedDate : 'Select a day'}</h3>

          {!selectedDate ? (
            <p className="empty-mini">Click a date to see events</p>
          ) : selectedDayEvents.length === 0 ? (
            <p className="empty-mini">No events on this day</p>
          ) : (
            <div className="day-events-list">
              <AnimatePresence>
                {selectedDayEvents.map((event) => (
                  <motion.div
                    className="day-event-item"
                    key={event.id}
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                  >
                    <span
                      className="event-type-badge"
                      style={{ background: typeColors[event.type] }}
                    >
                      {event.type}
                    </span>
                    <span className="event-title">{event.title}</span>
                    <button className="log-delete" onClick={() => handleDeleteEvent(event.id)}>✕</button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </motion.div>
      </div>

      {showForm && (
        <EventForm
          defaultDate={selectedDate}
          onSave={handleSaveEvent}
          onClose={() => setShowForm(false)}
        />
      )}
    </div>
  );
}