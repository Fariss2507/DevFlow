export const eventTypes = ['Deadline', 'Meeting', 'Release', 'Sprint Planning', 'Task'];

export const typeColors = {
  Deadline: '#dc2626',
  Meeting: 'var(--color-accent)',
  Release: 'var(--color-primary)',
  'Sprint Planning': '#d97706',
  Task: 'var(--color-primary-dark)',
};

export const initialEvents = [
  { id: 1, title: 'Submit Bug Tracker module', date: '2026-07-22', type: 'Deadline' },
  { id: 2, title: 'Team standup', date: '2026-07-21', type: 'Meeting' },
  { id: 3, title: 'v1.0 Frontend Release', date: '2026-07-31', type: 'Release' },
  { id: 4, title: 'Week 4 Sprint Planning', date: '2026-07-25', type: 'Sprint Planning' },
  { id: 5, title: 'Finish Calendar module', date: '2026-07-21', type: 'Task' },
];