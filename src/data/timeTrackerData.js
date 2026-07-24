export const initialLogs = [
  { id: 1, task: 'Built Kanban board', date: '2026-07-21', duration: 7200 }, // seconds
  { id: 2, task: 'Fixed auth page responsiveness', date: '2026-07-20', duration: 5400 },
  { id: 3, task: 'API collection module', date: '2026-07-20', duration: 3600 },
];

export function formatDuration(seconds) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  return `${h}h ${m}m ${s}s`;
}