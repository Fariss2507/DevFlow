import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CalendarGrid from './CalendarGrid';
import EventForm from './EventForm';
import api from '@/services/api';
import { typeColors } from '@/data/calendarData';
import { Trash2, ArrowLeft, ArrowRight, CalendarDays } from 'lucide-react';
import './Calendar.css';

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await api.get('/events');
      const mapped = res.data.map((e) => ({ ...e, id: e._id }));
      setEvents(mapped);
    } catch (err) {
      console.error('Failed to fetch events', err);
    } finally {
      setLoading(false);
    }
  };

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

  const handleSaveEvent = async (event) => {
    try {
      const res = await api.post('/events', event);
      const created = { ...res.data, id: res.data._id };
      setEvents([...events, created]);
      setShowForm(false);
    } catch (err) {
      console.error('Failed to save event', err);
    }
  };

  const handleDeleteEvent = async (id) => {
    try {
      await api.delete(`/events/${id}`);
      setEvents(events.filter((e) => e.id !== id));
    } catch (err) {
      console.error('Failed to delete event', err);
    }
  };

  const selectedDayEvents = useMemo(
    () => events.filter((e) => e.date === selectedDate),
    [events, selectedDate]
  );

  if (loading) {
    return (
      <div className="page">
        <h1>Calendar</h1>
        <p className="empty-state">Loading calendar...</p>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="page-header">
        <h1>Calendar</h1>
        <motion.button
          className="btn-primary"
          onClick={() => setShowForm(true)}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <CalendarDays size={14} />
            New Event
          </span>
        </motion.button>
      </div>

      <div className="calendar-layout">
        <div className="calendar-panel-premium">
          <div className="calendar-nav">
            <motion.button
              className="btn-secondary"
              onClick={goPrevMonth}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <ArrowLeft size={14} />
                Prev
              </span>
            </motion.button>
            <h2>{monthLabel}</h2>
            <motion.button
              className="btn-secondary"
              onClick={goNextMonth}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                Next
                <ArrowRight size={14} />
              </span>
            </motion.button>
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
          className="calendar-sidebar-premium"
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
                    className="day-event-item-premium"
                    key={event.id}
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1, minWidth: 0 }}>
                      <span
                        className="event-type-badge"
                        style={{ background: typeColors[event.type] }}
                      >
                        {event.type}
                      </span>
                      <span className="event-title truncate" title={event.title}>{event.title}</span>
                    </div>
                    <button 
                      className="log-delete-btn" 
                      onClick={() => handleDeleteEvent(event.id)}
                      title="Delete event"
                    >
                      <Trash2 size={13} />
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </motion.div>
      </div>

      <AnimatePresence>
        {showForm && (
          <EventForm
            defaultDate={selectedDate}
            onSave={handleSaveEvent}
            onClose={() => setShowForm(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}