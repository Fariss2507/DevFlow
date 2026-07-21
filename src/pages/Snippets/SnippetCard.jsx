import { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import './Snippets.css';

export default function SnippetCard({ snippet, onEdit, onDelete, onToggleFavorite }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(snippet.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="snippet-card">
      <div className="snippet-card-top">
        <div>
          <h3>{snippet.title}</h3>
          <span className="language-badge">{snippet.language}</span>
        </div>
        <button
          className={`favorite-btn ${snippet.favorite ? 'active' : ''}`}
          onClick={() => onToggleFavorite(snippet.id)}
          title="Toggle favorite"
        >
          {snippet.favorite ? '★' : '☆'}
        </button>
      </div>

      <p className="snippet-desc">{snippet.description}</p>

      <div className="snippet-code-wrap">
        <SyntaxHighlighter
          language={snippet.language}
          style={oneLight}
          customStyle={{ margin: 0, fontSize: '0.78rem', borderRadius: '8px' }}
        >
          {snippet.code}
        </SyntaxHighlighter>
      </div>

      <div className="snippet-tags">
        {snippet.tags.map((tag) => (
          <span className="snippet-tag" key={tag}>{tag}</span>
        ))}
      </div>

      <div className="snippet-footer">
        <button className="btn-copy" onClick={handleCopy}>
          {copied ? '✓ Copied!' : '📋 Copy'}
        </button>
        <div className="snippet-actions">
          <button className="btn-secondary" onClick={() => onEdit(snippet)}>Edit</button>
          <button className="btn-danger" onClick={() => onDelete(snippet.id)}>Delete</button>
        </div>
      </div>
    </div>
  );
}