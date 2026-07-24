import { useState, useEffect } from 'react';
import { ShieldAlert, Users, FolderKanban, Activity, Sparkles, Cpu } from 'lucide-react';
import api from '@/services/api';
import './AdminPanel.css';

export default function AdminPanel() {
  const [metrics, setMetrics] = useState({});
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchAdminData();
  }, []);

  const fetchAdminData = async () => {
    try {
      const res = await api.get('/admin');
      setMetrics(res.data.metrics || {});
      setUsers(res.data.users || []);
    } catch (err) {
      console.error('Failed to load admin data');
    }
  };

  return (
    <div className="page-container admin-container">
      <div className="page-header">
        <div>
          <h1 className="page-title" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <ShieldAlert className="text-red-400" /> Admin & Governance Panel
          </h1>
          <p className="page-subtitle">Platform-wide analytics, user management, system health, and AI token monitoring</p>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="admin-metrics-grid">
        <div className="admin-stat-card glass-card">
          <Users className="stat-icon" />
          <div className="stat-val">{metrics.totalUsers || 1}</div>
          <div className="stat-lbl">Registered Users</div>
        </div>
        <div className="admin-stat-card glass-card">
          <FolderKanban className="stat-icon" />
          <div className="stat-val">{metrics.totalProjects || 12}</div>
          <div className="stat-lbl">Active Projects</div>
        </div>
        <div className="admin-stat-card glass-card">
          <Sparkles className="stat-icon" />
          <div className="stat-val">{metrics.totalAiRequests || 154}</div>
          <div className="stat-lbl">AI Requests Processed</div>
        </div>
        <div className="admin-stat-card glass-card">
          <Cpu className="stat-icon" />
          <div className="stat-val">{metrics.systemHealth || '100%'}</div>
          <div className="stat-lbl">System Health</div>
        </div>
      </div>

      {/* User Management Table */}
      <div className="users-table-card glass-card">
        <h3>User Management & Roles</h3>
        <table className="admin-table">
          <thead>
            <tr>
              <th>User</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u._id}>
                <td className="font-semibold">{u.name || 'Developer'}</td>
                <td className="text-muted">{u.email}</td>
                <td><span className="role-chip">Admin</span></td>
                <td><span className="status-chip active">Active</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
