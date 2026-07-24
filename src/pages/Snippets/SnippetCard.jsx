import { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vs as oneLight, vscDarkPlus as oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { motion } from "framer-motion";
import { useThemeStore } from '@/store/themeStore';
import { Star, Copy, Check, Edit2, Trash2 } from 'lucide-react';

export default function SnippetCard({ snippet, onEdit, onDelete, onToggleFavorite }) {
  const [copied, setCopied] = useState(false);
  const { theme } = useThemeStore();

  const handleCopy = () => {
    navigator.clipboard.writeText(snippet.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="snippet-card-premium"
    >
      {/* Header */}
      <div className="snippet-card-header">
        <div>
          <h3 className="snippet-card-title truncate" title={snippet.title}>{snippet.title}</h3>
          <span className="language-badge" style={{ marginTop: '6px', display: 'inline-block' }}>
            {snippet.language}
          </span>
        </div>
        <button
          className={`favorite-btn ${snippet.favorite ? 'active' : ''}`}
          onClick={() => onToggleFavorite(snippet.id)}
          title="Toggle favorite"
        >
          <Star size={16} fill={snippet.favorite ? "currentColor" : "none"} />
        </button>
      </div>

      {/* Code Snippet Block */}
      <div className="project-card-body">
        <p className="snippet-card-desc">{snippet.description}</p>

        <div className="snippet-code-wrap">
          <SyntaxHighlighter
            language={snippet.language.toLowerCase()}
            style={theme === 'dark' ? oneDark : oneLight}
            customStyle={{ margin: 0, padding: '12px', fontSize: '0.78rem', background: 'transparent' }}
          >
            {snippet.code}
          </SyntaxHighlighter>
        </div>

        {snippet.tags && snippet.tags.length > 0 && (
          <div className="snippet-tags">
            {snippet.tags.map((tag) => (
              <span className="snippet-tag" key={tag}>
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="snippet-footer">
        <button
          className="btn-copy"
          onClick={handleCopy}
          style={copied ? { background: 'linear-gradient(135deg, #10b981, #059669)', boxShadow: '0 4px 10px rgba(16, 185, 129, 0.3)' } : {}}
        >
          <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            {copied ? <Check size={14} /> : <Copy size={14} />}
            {copied ? 'Copied!' : 'Copy Code'}
          </span>
        </button>

        <div className="snippet-actions">
          <button className="btn-card-edit" onClick={() => onEdit(snippet)}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Edit2 size={12} />
              Edit
            </span>
          </button>
          <button className="btn-card-delete" onClick={() => onDelete(snippet.id)}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Trash2 size={12} />
              Delete
            </span>
          </button>
        </div>
      </div>
    </motion.div>
  );
}