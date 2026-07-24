import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, Edit2, Trash2 } from 'lucide-react';

const methodClassMap = {
  GET: 'method-get',
  POST: 'method-post',
  PUT: 'method-put',
  PATCH: 'method-patch',
  DELETE: 'method-delete',
};

export default function ApiCard({ api, onEdit, onDelete }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      layout
      transition={{ duration: 0.25, ease: 'easeInOut' }}
      className="api-card-premium"
    >
      {/* Header */}
      <div
        className="api-card-header"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="api-card-title-wrap">
          <span className={`api-method-badge ${methodClassMap[api.method] || 'method-get'}`}>
            {api.method}
          </span>
          <span className="api-endpoint-text">{api.endpoint}</span>
        </div>
        <div className="api-meta-right">
          <span className="api-name-text">{api.name}</span>
          <span className="expand-icon" style={{ display: 'flex', alignItems: 'center' }}>
            {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </span>
        </div>
      </div>

      {/* Expanded Body Panel */}
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            style={{ overflow: 'hidden' }}
          >
            <div className="api-card-body-wrap">
              
              {api.headers && (
                <div className="api-block">
                  <strong className="api-block-title">Headers</strong>
                  <pre className="api-block-pre">{api.headers}</pre>
                </div>
              )}

              {api.requestBody && (
                <div className="api-block">
                  <strong className="api-block-title">Request Body</strong>
                  <pre className="api-block-pre">{api.requestBody}</pre>
                </div>
              )}

              {api.responseExample && (
                <div className="api-block">
                  <strong className="api-block-title">Response Example</strong>
                  <pre className="api-block-pre">{api.responseExample}</pre>
                </div>
              )}

              {api.authDetails && (
                <div className="api-block">
                  <strong className="api-block-title">Authentication</strong>
                  <p className="api-block-pre" style={{ background: 'rgba(255, 255, 255, 0.4)' }}>{api.authDetails}</p>
                </div>
              )}

              {/* Actions Footer */}
              <div className="api-card-actions">
                <button
                  className="btn-card-edit"
                  onClick={(e) => { e.stopPropagation(); onEdit(api); }}
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Edit2 size={12} />
                    Edit
                  </span>
                </button>
                <button
                  className="btn-card-delete"
                  onClick={(e) => { e.stopPropagation(); onDelete(api.id); }}
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Trash2 size={12} />
                    Delete
                  </span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}