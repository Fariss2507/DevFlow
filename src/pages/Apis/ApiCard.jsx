import { useState } from 'react';
import './Apis.css';

const methodColors = {
  GET: 'var(--color-accent)',
  POST: 'var(--color-primary)',
  PUT: '#d97706',
  PATCH: '#d97706',
  DELETE: '#dc2626',
};

export default function ApiCard({ api, onEdit, onDelete }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="api-card">
      <div className="api-card-header" onClick={() => setExpanded(!expanded)}>
        <div className="api-card-title">
          <span className="method-badge" style={{ background: methodColors[api.method] }}>
            {api.method}
          </span>
          <span className="api-endpoint">{api.endpoint}</span>
        </div>
        <span className="api-name">{api.name}</span>
        <span className="expand-icon">{expanded ? '▲' : '▼'}</span>
      </div>

      {expanded && (
        <div className="api-card-body">
          {api.headers && (
            <div className="api-section">
              <strong>Headers</strong>
              <pre>{api.headers}</pre>
            </div>
          )}

          {api.requestBody && (
            <div className="api-section">
              <strong>Request Body</strong>
              <pre>{api.requestBody}</pre>
            </div>
          )}

          {api.responseExample && (
            <div className="api-section">
              <strong>Response Example</strong>
              <pre>{api.responseExample}</pre>
            </div>
          )}

          {api.authDetails && (
            <div className="api-section">
              <strong>Authentication</strong>
              <p>{api.authDetails}</p>
            </div>
          )}

          <div className="api-actions">
            <button className="btn-secondary" onClick={(e) => { e.stopPropagation(); onEdit(api); }}>Edit</button>
            <button className="btn-danger" onClick={(e) => { e.stopPropagation(); onDelete(api.id); }}>Delete</button>
          </div>
        </div>
      )}
    </div>
  );
}