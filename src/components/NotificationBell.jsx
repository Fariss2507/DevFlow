import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../services/api';
import './NotificationBell.css';

const notifIcons = {
  Deadline: '⏰',
  Task: '📝',
  Bug: '🐞',
  Release: '🚀',
};

export default function NotificationBell() {
  const [notifications, setNotifications] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const res = await api.get('/notifications');
      const mapped = res.data.map((n) => ({
        ...n,
        id: n._id,
        time: new Date(n.createdAt).toLocaleString(),
      }));
      setNotifications(mapped);
    } catch (err) {
      console.error('Failed to fetch notifications', err);
    }
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAsRead = async (id) => {
    try {
      await api.put(`/notifications/${id}/read`);
      setNotifications(notifications.map((n) => (n.id === id ? { ...n, read: true } : n)));
    } catch (err) {
      console.error('Failed to mark as read', err);
    }
  };

  const markAllRead = async () => {
    try {
      await api.put('/notifications/read-all');
      setNotifications(notifications.map((n) => ({ ...n, read: true })));
    } catch (err) {
      console.error('Failed to mark all read', err);
    }
  };

  const clearAll = async () => {
    try {
      await api.delete('/notifications/clear-all');
      setNotifications([]);
    } catch (err) {
      console.error('Failed to clear notifications', err);
    }
  };

  return (
    <div className="notif-wrapper">
      <button className="notif-bell" onClick={() => setIsOpen(!isOpen)}>
        🔔
        {unreadCount > 0 && (
          <motion.span
            className="notif-badge"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            key={unreadCount}
          >
            {unreadCount}
          </motion.span>
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <div className="notif-backdrop" onClick={() => setIsOpen(false)} />
            <motion.div
              className="notif-panel"
              initial={{ opacity: 0, y: -10, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.97 }}
              transition={{ duration: 0.18 }}
            >
              <div className="notif-panel-header">
                <h3>Notifications</h3>
                {notifications.length > 0 && (
                  <div className="notif-header-actions">
                    <button onClick={markAllRead}>Mark all read</button>
                    <button onClick={clearAll}>Clear</button>
                  </div>
                )}
              </div>

              <div className="notif-list">
                {notifications.length === 0 ? (
                  <p className="notif-empty">No notifications 🎉</p>
                ) : (
                  <AnimatePresence>
                    {notifications.map((n) => (
                      <motion.div
                        key={n.id}
                        className={`notif-item ${!n.read ? 'unread' : ''}`}
                        onClick={() => markAsRead(n.id)}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 10 }}
                        layout
                      >
                        <span className="notif-icon">{notifIcons[n.type] || '🔔'}</span>
                        <div className="notif-content">
                          <p>{n.message}</p>
                          <span className="notif-time">{n.time}</span>
                        </div>
                        {!n.read && <span className="notif-dot" />}
                      </motion.div>
                    ))}
                  </AnimatePresence>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}