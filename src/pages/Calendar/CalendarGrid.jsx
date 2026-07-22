import { motion } from 'framer-motion';
import { typeColors } from '../../data/calendarData';
import './Calendar.css';

export default function CalendarGrid({ currentDate, events, onDayClick, selectedDate }) {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDayOfMonth = new Date(year, month, 1);
  const startWeekday = firstDayOfMonth.getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const cells = [];
  for (let i = 0; i < startWeekday; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  const toDateStr = (day) =>
    `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

  const todayStr = new Date().toISOString().split('T')[0];

  return (
    <div className="calendar-grid">
      {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
        <div className="calendar-weekday" key={d}>{d}</div>
      ))}

      {cells.map((day, idx) => {
        if (day === null) return <div className="calendar-cell empty" key={`empty-${idx}`} />;

        const dateStr = toDateStr(day);
        const dayEvents = events.filter((e) => e.date === dateStr);
        const isToday = dateStr === todayStr;
        const isSelected = dateStr === selectedDate;

        return (
          <motion.div
            className={`calendar-cell ${isToday ? 'today' : ''} ${isSelected ? 'selected' : ''}`}
            key={dateStr}
            onClick={() => onDayClick(dateStr)}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2, delay: day * 0.01 }}
          >
            <span className="cell-day-num">{day}</span>
         <div className="cell-dots">
  {dayEvents.slice(0, 4).map((e) => (
    <span
      key={e.id}
      className="event-dot"
      style={{ background: typeColors[e.type] }}
      title={e.title}
    />
  ))}
  {dayEvents.length > 4 && <span className="more-dot">+{dayEvents.length - 4}</span>}
</div>
          </motion.div>
        );
      })}
    </div>
  );
}