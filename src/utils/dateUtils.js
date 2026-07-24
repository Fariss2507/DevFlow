/**
 * formatDate — formats an ISO date string to a readable format.
 * @param {string} dateStr - ISO date string
 * @param {object} opts - Intl.DateTimeFormat options
 * @returns {string}
 */
export function formatDate(dateStr, opts = { year: 'numeric', month: 'short', day: 'numeric' }) {
  if (!dateStr) return '—';
  return new Intl.DateTimeFormat('en-US', opts).format(new Date(dateStr));
}

/**
 * formatRelativeTime — returns relative time string (e.g. "3 hours ago").
 * @param {string} dateStr
 * @returns {string}
 */
export function formatRelativeTime(dateStr) {
  if (!dateStr) return '—';
  const diff = Date.now() - new Date(dateStr).getTime();
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) return `${days}d ago`;
  if (hours > 0) return `${hours}h ago`;
  if (minutes > 0) return `${minutes}m ago`;
  return 'just now';
}

/**
 * formatDuration — converts seconds to HH:MM:SS string.
 * @param {number} totalSeconds
 * @returns {string}
 */
export function formatDuration(totalSeconds) {
  const h = Math.floor(totalSeconds / 3600).toString().padStart(2, '0');
  const m = Math.floor((totalSeconds % 3600) / 60).toString().padStart(2, '0');
  const s = (totalSeconds % 60).toString().padStart(2, '0');
  return `${h}:${m}:${s}`;
}
