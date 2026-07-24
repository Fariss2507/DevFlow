import { useState, useEffect } from 'react';
import { BookOpen, Sparkles, Plus, History, Edit3, Save } from 'lucide-react';
import api from '@/services/api';
import './DocsManager.css';

export default function DocsManager() {
  const [docs, setDocs] = useState([]);
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [content, setContent] = useState('');
  const [loadingAi, setLoadingAi] = useState(false);

  useEffect(() => {
    fetchDocs();
  }, []);

  const fetchDocs = async () => {
    try {
      const res = await api.get('/docs');
      setDocs(res.data || []);
      if (res.data.length > 0 && !selectedDoc) {
        setSelectedDoc(res.data[0]);
        setContent(res.data[0].content);
      }
    } catch (err) {
      console.error('Failed to load docs');
    }
  };

  const handleSelectDoc = (doc) => {
    setSelectedDoc(doc);
    setContent(doc.content);
  };

  const handleCreateDoc = async () => {
    const title = prompt('Enter Document Title:');
    if (!title) return;

    try {
      const res = await api.post('/docs', { title, content: `# ${title}\n\nStart writing documentation here...` });
      setDocs([res.data, ...docs]);
      setSelectedDoc(res.data);
      setContent(res.data.content);
    } catch (err) {
      alert('Failed to create doc');
    }
  };

  const handleAiSummary = async () => {
    if (!content) return;
    setLoadingAi(true);
    try {
      const res = await api.post('/ai', { tool: 'doc', prompt: `Summarize this documentation:\n${content}` });
      setContent(prev => `${prev}\n\n---\n### 🤖 AI Summary\n${res.data.response}`);
    } catch (err) {
      alert('AI Summary failed');
    } finally {
      setLoadingAi(false);
    }
  };

  const handleAiRewrite = async () => {
    if (!content) return;
    setLoadingAi(true);
    try {
      const res = await api.post('/ai', { tool: 'doc', prompt: `Rewrite and improve clarity of:\n${content}` });
      setContent(res.data.response);
    } catch (err) {
      alert('AI Rewrite failed');
    } finally {
      setLoadingAi(false);
    }
  };

  return (
    <div className="page-container docs-manager-container">
      <div className="page-header">
        <div>
          <h1 className="page-title">Documentation Hub</h1>
          <p className="page-subtitle">Markdown system specs, version control, and AI documentation tools</p>
        </div>
        <button className="btn-primary" onClick={handleCreateDoc}>
          <Plus size={16} /> New Document
        </button>
      </div>

      <div className="docs-layout">
        {/* Document List Sidebar */}
        <div className="docs-sidebar glass-card">
          <div className="sidebar-header">Documents</div>
          <div className="doc-list">
            {docs.map(doc => (
              <div
                key={doc._id}
                className={`doc-item ${selectedDoc?._id === doc._id ? 'active' : ''}`}
                onClick={() => handleSelectDoc(doc)}
              >
                <BookOpen size={16} />
                <span>{doc.title}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Editor View */}
        <div className="docs-editor glass-card">
          {selectedDoc ? (
            <>
              <div className="editor-toolbar">
                <h2>{selectedDoc.title}</h2>
                <div className="toolbar-actions">
                  <button className="btn-secondary" onClick={handleAiSummary} disabled={loadingAi}>
                    <Sparkles size={14} /> AI Summary
                  </button>
                  <button className="btn-secondary" onClick={handleAiRewrite} disabled={loadingAi}>
                    <Edit3 size={14} /> AI Rewrite
                  </button>
                </div>
              </div>

              <textarea
                className="doc-textarea"
                value={content}
                onChange={e => setContent(e.target.value)}
                rows={18}
              />

              <div className="version-history-section">
                <h4><History size={14} /> Version History</h4>
                <div className="version-list">
                  {selectedDoc.versionHistory?.map((v, i) => (
                    <div key={i} className="version-chip">
                      v{v.version} • {new Date(v.updatedAt || Date.now()).toLocaleDateString()}
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <div className="empty-state">Select or create a document to start editing.</div>
          )}
        </div>
      </div>
    </div>
  );
}
